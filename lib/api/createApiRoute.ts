import { createApiRouteCreator } from "./createApiRouteCreator";
import { fakeDb } from "./fakeDb";

export const createApiRoute = createApiRouteCreator({
  unimplementedMethod(req, res) {
    res.status(405).json({ message: "Unimplemented" });
  },
  createContext() {
    return {
      db: fakeDb,
    };
  },
});
