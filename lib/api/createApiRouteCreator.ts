import { NextApiRequest as Req, NextApiResponse as Res } from "next";
import { AllowedMethod, isAllowedMethod } from "./allowedMethods";

type CreateApiRouteCreatorArgs = {
  unimplementedMethod: (req: Req, res: Res) => any;
};

type CreateApiRouteArgs = {
  [method in AllowedMethod]?: (req: Req, res: Res) => any;
};

// The main constructor function which is used to construct our createApiRoute
// function.
export function createApiRouteCreator(args: CreateApiRouteCreatorArgs) {
  // The constructed createApiRoute function, which returns us with a handler
  // function that can be default exported from an API route.
  return function createApiRoute(options: CreateApiRouteArgs) {
    // The route handler
    return async function handler(req: Req, res: Res) {
      // Ensure method is an allowed method and use the correct handler.
      // If no handler
      const _method = req.method?.toLowerCase();

      // Use the correct handler based on the method or use the unimplemented
      // handler, when no handler available for method.
      const handler = isAllowedMethod(_method)
        ? options[_method] ?? args.unimplementedMethod
        : args.unimplementedMethod;

      // Run the handler
      await handler(req, res);
    };
  };
}
