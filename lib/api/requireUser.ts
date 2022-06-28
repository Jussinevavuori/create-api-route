import { NextApiRequest } from "next";

export async function requireUser(req: NextApiRequest) {
  const didFindUser = await new Promise<boolean>((r) => r(Math.random() < 0.5));

  if (!didFindUser) {
    throw "Unauthenticated";
  }

  return { id: "1" };
}
