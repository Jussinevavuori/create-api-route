import { createApiRouteCreator } from "./createApiRouteCreator";
import { fakeDb } from "./fakeDb";
import initMiddleware from "./initMiddleware";
import Cors from "cors";
import { NextApiRequest } from "next";

// Define new middleware
const corsMiddleware = initMiddleware(Cors());
const loggerMiddleware = async (req: NextApiRequest) => {
  console.log("Incoming", req.method, "request");
};

export const createApiRoute = createApiRouteCreator({
  unimplementedMethod(req, res) {
    res.status(405).json({ message: "Unimplemented" });
  },
  createContext() {
    return {
      db: fakeDb,
    };
  },
  // Apply global middleware
  middleware: [corsMiddleware, loggerMiddleware],
  handleError(req, res, error) {
    if (typeof error === "string") {
      return res.status(400).send({ message: error });
    }

    res.status(400).send({ message: "Something wen't wrong!" });
  },
});
