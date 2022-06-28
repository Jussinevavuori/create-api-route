import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST": {
      // Process a POST request
      return res.status(200).json({ message: "🤝🏻" });
    }
    case "GET": {
      // Process a GET request
      return res.status(200).json({ message: "🚀" });
    }
    default: {
      // All other methods
      return res.status(405).json({ message: "Method not allowed" });
    }
  }
}
