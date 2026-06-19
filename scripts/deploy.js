const fs = require("fs");
const path = require("path");
const ftp = require("basic-ftp");
const { execSync } = require("child_process");

// 1. Parse .env.local file to read credentials securely
function loadLocalEnv() {
  const envPath = path.join(__dirname, "../.env.local");
  if (fs.existsSync(envPath)) {
    console.log("📝 Cargando variables de entorno desde .env.local...");
    const content = fs.readFileSync(envPath, "utf-8");
    content.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const index = trimmed.indexOf("=");
      if (index > 0) {
        const key = trimmed.substring(0, index).trim();
        const val = trimmed.substring(index + 1).trim().replace(/^['"]|['"]$/g, "");
        process.env[key] = val;
      }
    });
  }
}

async function run() {
  loadLocalEnv();

  const host = process.env.FTP_SERVER || process.env.FTP_HOST;
  const user = process.env.FTP_USERNAME || process.env.FTP_USER;
  const password = process.env.FTP_PASSWORD;
  const remoteDir = process.env.FTP_REMOTE_DIR || "/";
  const secure = process.env.FTP_SECURE === "true"; // set true to enforce FTPS

  if (!host || !user || !password) {
    console.error("\n❌ Error: Falta configurar credenciales en .env.local.");
    console.error("Asegúrate de definir FTP_SERVER, FTP_USERNAME y FTP_PASSWORD.");
    process.exit(1);
  }

  // 2. Build local Next.js static export
  console.log("\n📦 Compilando el proyecto Next.js locally...");
  try {
    execSync("npm run build", { stdio: "inherit" });
    console.log("✅ Compilación estática completada.");
  } catch (error) {
    console.error("❌ Falló la compilación del proyecto.");
    process.exit(1);
  }

  // 3. Connect and upload to FTP
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    console.log(`\n🚀 Conectando a ${host} como ${user}...`);
    await client.access({
      host,
      user,
      password,
      secure: secure ? "implicit" : false, // or true for explicit FTPS
      secureOptions: {
        rejectUnauthorized: false // bypass SSL cert errors in dev servers
      }
    });

    console.log("🌐 Conexión establecida. Iniciando subida de archivos...");
    
    // Upload local './out' folder to remote destination
    const localOutPath = path.join(__dirname, "../out");
    await client.ensureDir(remoteDir);
    await client.uploadFromDir(localOutPath);

    console.log("\n✨ ¡Despliegue local completado con éxito!");
    console.log("Visita: https://inacap60.todovirtual.cl");
  } catch (err) {
    console.error("\n🔥 Error durante el despliegue FTP:", err.message);
  } finally {
    client.close();
  }
}

run();
