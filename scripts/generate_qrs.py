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
    
    distinct_hashes = [
        "A1B2C3D4E5F6G7H8",
        "Z9Y8X7W6V5U4T3S2",
        "M1N2O3P4Q5R6S7T8",
        "L9K8J7I6H5G4F3E2",
        "U1V2W3X4Y5Z6A7B8"
    ]
    
    for i in range(1, 6):
        scan_url = f"{domain}/herramientas?scan={i}&hash={distinct_hashes[i-1]}"
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
        logo_w, logo_h = 100, 100
        logo_resized = logo.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
        
        # White background backing card for the logo (300x300) to guarantee scannability
        # We will make this card highly distinct for each QR
        bg_w, bg_h = 340, 340
        logo_bg = Image.new("RGBA", (bg_w, bg_h), (255, 255, 255, 255))
        draw = ImageDraw.Draw(logo_bg)
        
        # Draw visually distinct patterns based on the index to help MindAR
        colors = [(30, 64, 175), (220, 38, 38), (16, 185, 129), (139, 92, 246), (245, 158, 11)]
        color = colors[i - 1]
        
        # Draw a thick distinct border shape
        if i == 1:
            draw.ellipse([10, 10, bg_w - 10, bg_h - 10], outline=color, width=20)
        elif i == 2:
            draw.rectangle([10, 10, bg_w - 10, bg_h - 10], outline=color, width=20)
        elif i == 3:
            draw.polygon([(bg_w/2, 10), (bg_w-10, bg_h-10), (10, bg_h-10)], outline=color, width=20)
        elif i == 4:
            draw.rounded_rectangle([10, 10, bg_w - 10, bg_h - 10], radius=50, outline=color, width=20)
        else:
            draw.polygon([(10, bg_h/2), (bg_w/2, 10), (bg_w-10, bg_h/2), (bg_w/2, bg_h-10)], outline=color, width=20)
            
        # Add a massive number to the background
        # We'll draw it manually using lines since we might not have a reliable TTF font installed
        # Just simple line segments for digits
        cx, cy = bg_w // 2, bg_h // 2 + 50
        lw = 15
        if i == 1:
            draw.line([(cx, cy - 40), (cx, cy + 40)], fill=color, width=lw)
        elif i == 2:
            draw.line([(cx - 30, cy - 40), (cx + 30, cy - 40), (cx + 30, cy), (cx - 30, cy), (cx - 30, cy + 40), (cx + 30, cy + 40)], fill=color, width=lw)
        elif i == 3:
            draw.line([(cx - 30, cy - 40), (cx + 30, cy - 40), (cx + 30, cy + 40), (cx - 30, cy + 40)], fill=color, width=lw)
            draw.line([(cx - 30, cy), (cx + 30, cy)], fill=color, width=lw)
        elif i == 4:
            draw.line([(cx - 30, cy - 40), (cx - 30, cy), (cx + 30, cy)], fill=color, width=lw)
            draw.line([(cx + 30, cy - 40), (cx + 30, cy + 40)], fill=color, width=lw)
        elif i == 5:
            draw.line([(cx + 30, cy - 40), (cx - 30, cy - 40), (cx - 30, cy), (cx + 30, cy), (cx + 30, cy + 40), (cx - 30, cy + 40)], fill=color, width=lw)
        
        # Paste logo on top part of the white background
        logo_x = (bg_w - logo_w) // 2
        logo_y = 40
        logo_bg.paste(logo_resized, (logo_x, logo_y), logo_resized)
        
        # Paste the white card on the center of the QR
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
