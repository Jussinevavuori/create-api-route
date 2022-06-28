import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

// From the Next.js API Routes documentation, with added TypeScript
// https://nextjs.org/docs/api-routes/api-middlewares
//
// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Create the cors middleware
const cors = Cors({ methods: ["GET", "HEAD", "POST", "OPTIONS"] });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the cors middleware before any of the event logic
  await runMiddleware(req, res, cors);

  res.json({ value: "🚀" });
}
