import { NextApiRequest as Req, NextApiResponse as Res } from "next";
import { AllowedMethod, isAllowedMethod } from "./allowedMethods";

type CreateApiRouteCreatorArgs<Context> = {
  createContext(req: Req, res: Res): Context;
  unimplementedMethod: (req: Req, res: Res, ctx: Context) => any;
};

type CreateApiRouteArgs<Context> = {
  [method in AllowedMethod]?: (req: Req, res: Res, ctx: Context) => any;
};

// The main constructor function which is used to construct our createApiRoute
// function.
export function createApiRouteCreator<Context>(
  args: CreateApiRouteCreatorArgs<Context>
) {
  // The constructed createApiRoute function, which returns us with a handler
  // function that can be default exported from an API route.
  return function createApiRoute(options: CreateApiRouteArgs<Context>) {
    // The route handler
    return async function handler(req: Req, res: Res) {
      // Create the context object
      const context = args.createContext(req, res);

      // Ensure method is an allowed method and use the correct handler.
      // If no handler
      const _method = req.method?.toLowerCase();

      // Use the correct handler based on the method or use the unimplemented
      // handler, when no handler available for method.
      const handler = isAllowedMethod(_method)
        ? options[_method] ?? args.unimplementedMethod
        : args.unimplementedMethod;

      // Run the handler with context
      await handler(req, res, context);
    };
  };
}
