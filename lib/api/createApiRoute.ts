import { createApiRouteCreator } from "./createApiRouteCreator";

export const createApiRoute = createApiRouteCreator({
  unimplementedMethod(req, res) {
    res.status(405).json({ message: "Unimplemented" });
  },
});
