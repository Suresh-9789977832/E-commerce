import dns from "dns";
import { promisify } from "util";
import http from "http";

const resolveSrv = promisify(dns.resolveSrv);
const resolveTxt = promisify(dns.resolveTxt);

async function diagnoseConnection() {
  console.log("\n🔍 MongoDB Connection Diagnostic Tool\n");

  // 1. Test Internet Connection
  console.log("1️⃣  Testing Internet Connection...");
  try {
    await new Promise((resolve, reject) => {
      http
        .get("http://www.google.com", { timeout: 5000 }, () => {
          console.log("   ✓ Internet connection OK\n");
          resolve();
        })
        .on("error", reject);
    });
  } catch {
    console.log("   ✗ No internet connection! Please check your network.\n");
    return;
  }

  // 2. Test DNS Resolution
  console.log("2️⃣  Testing DNS Resolution...");
  try {
    await resolveSrv("_mongodb._tcp.cluster0.kw514qp.mongodb.net");
    console.log("   ✓ DNS SRV record resolved OK\n");
  } catch (err) {
    console.log("   ✗ DNS SRV lookup failed!");
    console.log(`   Error: ${err.message}\n`);
    console.log(
      "   🛠️  SOLUTION: Try using a standard MongoDB connection string instead"
    );
    console.log(
      "   Add this to your .env file:\n"
    );
    console.log(
      "   MONGO_URI=mongodb+srv://sanddysuresh_db_user:lz4EDvD0CmJHkOGC@cluster0.kw514qp.mongodb.net/ecommerce?retryWrites=true&w=majority&authSource=admin\n"
    );
    return;
  }

  // 3. Check MongoDB URI format
  console.log("3️⃣  Checking MongoDB URI Format...");
  const uri = process.env.MONGO_URI;
  console.log(`   URI: ${uri}\n`);

  if (uri.includes("mongodb+srv://")) {
    console.log("   ✓ Using SRV connection string format\n");
  } else {
    console.log("   ✗ Not using SRV format\n");
  }

  // 4. Provide Troubleshooting Steps
  console.log("4️⃣  Troubleshooting Steps:\n");
  console.log("   a) Check IP Whitelist in MongoDB Atlas:");
  console.log("      - Go to https://cloud.mongodb.com/");
  console.log("      - Select your cluster (cluster0)");
  console.log("      - Network Access → IP Whitelist");
  console.log("      - Add your current IP or 0.0.0.0/0 (for testing)\n");

  console.log("   b) Verify Database Credentials:");
  console.log("      - Username: sanddysuresh_db_user");
  console.log("      - Check password matches in .env file\n");

  console.log("   c) Try Direct Connection:");
  console.log(
    "      - Remove ?retryWrites=true&w=majority from URI if issues persist\n"
  );

  console.log("   d) Firewall/Antivirus:");
  console.log("      - Check if blocking outbound connections to MongoDB\n");
}

diagnoseConnection().catch(console.error);
