import express from "express";
const router = express.Router();
export default router;

import requireBody from "#middleware/requireBody";
import { createUser } from "#db/queries/users";
import { createToken } from "#utils/jwt";

router.post(
  "/register",
  requireBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;
    const user = await createUser(username, password);
    const token = createToken({ id: user.id });
    res.send(token);
  },
);


