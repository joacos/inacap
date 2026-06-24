const ftp = require("basic-ftp");

async function deploy() {
  let host = process.env.FTP_SERVER;
  const user = process.env.FTP_USERNAME;
  const password = process.env.FTP_PASSWORD;

  if (!host || !user || !password) {
    console.error("Missing FTP_SERVER, FTP_USERNAME, or FTP_PASSWORD env vars");
    process.exit(1);
  }

  let defaultPort = 21;
  // Strip protocol prefix if any
  const protoMatch = host.match(/^(ftp|ftps):\/\/(.*)$/i);
  if (protoMatch) {
    host = protoMatch[2];
  }
  // Extract port if specified
  const portMatch = host.match(/^(.*):(\d+)$/);
  if (portMatch) {
    host = portMatch[1];
    defaultPort = parseInt(portMatch[2], 10);
  }
  // Strip trailing paths
  host = host.split("/")[0].trim();

  console.log(`Parsed FTP server: ${host} on default port ${defaultPort}`);

  // Try multiple connection strategies in order
  const strategies = [
    {
      name: `Explicit FTPS (AUTH TLS on port ${defaultPort})`,
      options: {
        host,
        port: defaultPort,
        user,
        password,
        secure: true,
        secureOptions: { rejectUnauthorized: false },
      },
    },
    {
      name: `Plain FTP (no TLS on port ${defaultPort})`,
      options: {
        host,
        port: defaultPort,
        user,
        password,
        secure: false,
      },
    },
    {
      name: "Implicit FTPS (port 990)",
      options: {
        host,
        port: 990,
        user,
        password,
        secure: "implicit",
        secureOptions: { rejectUnauthorized: false },
      },
    },
  ];

  let activeClient = null;

  for (const strategy of strategies) {
    console.log(`\n=== Trying: ${strategy.name} ===`);
    const client = new ftp.Client(60000); // 60s timeout
    client.ftp.verbose = true;
    client.ftp.ignorePasvAddress = true; // Fix for cPanel NAT
    client.ftp.ipFamily = 4;

    try {
      await client.access(strategy.options);
      console.log(`✅ Connected via: ${strategy.name}`);
      activeClient = client;
      break;
    } catch (err) {
      console.log(`❌ Failed: ${err.message}`);
      client.close();
    }
  }

  if (!activeClient) {
    console.error("\n🚫 All connection strategies failed. Check your FTP credentials and server configuration.");
    process.exit(1);
  }

  try {
    await activeClient.ensureDir("/");
    console.log("\n🗑️  Clearing remote directory...");
    await activeClient.clearWorkingDir();
    console.log("📤 Uploading out/ directory...");
    await activeClient.uploadFromDir("out", "/");
    console.log("\n✅ Deploy complete!");
  } catch (err) {
    console.error("Deployment failed:", err);
    process.exit(1);
  } finally {
    activeClient.close();
  }
}

deploy();
