import os
import zipfile
import requests
from PIL import Image, ImageDraw

def create_qrs():
    # Make sure output directories exist
    os.makedirs("qrs", exist_ok=True)
    
    logo_path = "public/logo_inacap.png"
    if not os.path.exists(logo_path):
        print(f"Error: Logo file {logo_path} does not exist.")
        return
        
    logo = Image.open(logo_path).convert("RGBA")
    
    domain = "https://inacap60.todovirtual.cl"
    size = 1000
    
    for i in range(1, 6):
        scan_url = f"{domain}/herramientas?scan={i}"
        qr_url = f"https://quickchart.io/qr?text={requests.utils.quote(scan_url)}&dotStyle=rounded&finderStyle=rounded&ecLevel=H&dark=1e40af&size={size}"
        
        print(f"Downloading QR for Station {i}...")
        response = requests.get(qr_url)
        if response.status_code != 200:
            print(f"Failed to download QR code {i}")
            continue
            
        # Save temp file
        temp_qr_path = f"qrs/temp_qr_{i}.png"
        with open(temp_qr_path, "wb") as f:
            f.write(response.content)
            
        # Open QR
        qr_img = Image.open(temp_qr_path).convert("RGBA")
        
        # Calculate sizes
        # QR is 1000x1000. Logo will be 200x200 in center.
        logo_w, logo_h = 200, 200
        logo_resized = logo.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
        
        # White background backing card for the logo (240x240) to guarantee scannability
        bg_w, bg_h = 240, 240
        logo_bg = Image.new("RGBA", (bg_w, bg_h), (255, 255, 255, 255))
        
        # Draw rounded rectangle border on the white background card
        draw = ImageDraw.Draw(logo_bg)
        # Add a subtle light grey border
        draw.rounded_rectangle([0, 0, bg_w - 1, bg_h - 1], radius=24, outline=(241, 245, 249, 255), width=4)
        
        # Paste logo on white background
        logo_x = (bg_w - logo_w) // 2
        logo_y = (bg_h - logo_h) // 2
        logo_bg.paste(logo_resized, (logo_x, logo_y), logo_resized)
        
        # Paste the white card + logo on the center of the QR
        qr_w, qr_h = qr_img.size
        paste_x = (qr_w - bg_w) // 2
        paste_y = (qr_h - bg_h) // 2
        
        qr_img.paste(logo_bg, (paste_x, paste_y), logo_bg)
        
        # Save final high-res QR code
        output_path = f"qrs/qr_estacion_{i}.png"
        qr_img.save(output_path, "PNG")
        print(f"Saved: {output_path}")
        
        # Remove temp file
        os.remove(temp_qr_path)
        
    # Compress all QRs into a zip file
    zip_filename = "qrs.zip"
    print(f"Creating {zip_filename}...")
    with zipfile.ZipFile(zip_filename, "w", zipfile.ZIP_DEFLATED) as zipf:
        for i in range(1, 6):
            file_to_zip = f"qrs/qr_estacion_{i}.png"
            if os.path.exists(file_to_zip):
                zipf.write(file_to_zip, arcname=f"qr_estacion_{i}.png")
                
    print("All done!")

if __name__ == "__main__":
    create_qrs()
