import { createApiRoute } from "../../lib/api/createApiRoute";

export default createApiRoute({
  async get(req, res, ctx) {
    const todos = await ctx.db.getTodosForUser("1");
    res.json(todos);
  },
});
