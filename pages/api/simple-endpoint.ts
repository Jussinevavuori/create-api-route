import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    res.json({ value: "🚀" });
  } else {
    res.json({ value: "❌" });
  }
}
