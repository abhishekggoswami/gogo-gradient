import {
  VercelRequest,
  VercelResponse,
} from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    // Handle different HTTP methods
    switch (req.method) {
      case "GET":
        // Add your GET logic here
        res.status(200).json({ message: "API is working" });
        break;
      case "POST":
        // Add your POST logic here
        res
          .status(200)
          .json({ message: "POST request received" });
        break;
      default:
        res
          .status(405)
          .json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    res
      .status(500)
      .json({ message: "Internal server error" });
  }
}
