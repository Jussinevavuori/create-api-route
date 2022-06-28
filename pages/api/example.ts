import { createApiRoute } from "../../lib/api/createApiRoute";
import { requireUser } from "../../lib/api/requireUser";

export default createApiRoute({
  async get(req, res, ctx) {
    const user = await requireUser(req);
    const todos = await ctx.db.getTodosForUser(user.id);

    res.json({ todos });
  },
  async post(req, res) {
    if (typeof req.body !== "string" || req.body === "") {
      throw "Request body not a string or empty string";
    }

    res.status(201).json({ message: "Thank you!" });
  },
  middleware: [
    async (req, res) => {
      console.log("Called local middleware");
    },
  ],
});
