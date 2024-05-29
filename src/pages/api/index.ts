import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Log the user agent header
  const userAgent = req.headers["user-agent"];

  console.table({
    Date: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    Time: new Date().toLocaleTimeString(),
    Framework: "Next Js",
    "User-Agent": userAgent,
  });

  try {
    // Forward the request to the Express.js API endpoint
    const response = await axios.get("http://localhost:5000/api");

    // Send back the response from the Express.js API
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error forwarding request to Express.js API:", error);
    res.status(500).json({ error: "Failed to fetch data from Express.js API" });
  }
}
