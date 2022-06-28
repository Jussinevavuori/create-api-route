import { createApiRoute } from "../../lib/api/createApiRoute";

export default createApiRoute({
  async get(req, res) {
    res.json({ value: "🚀" });
  },
  async post(req, res) {
    res.status(201).json({ message: "Thank you!" });
  },
});
