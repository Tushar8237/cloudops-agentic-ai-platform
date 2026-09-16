import { Router } from "express";
import { authenticate } from "../../services/auth/auth.service.js";

const router = Router();

router.post("/api/v1/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    res.status(400).json({
      error: "email and password are required"
    });
    return;
  }

  const result = await authenticate(email, password);

  if (!result) {
    res.status(401).json({
      error: "invalid credentials"
    });
    return;
  }

  res.status(200).json(result);
});

export default router;