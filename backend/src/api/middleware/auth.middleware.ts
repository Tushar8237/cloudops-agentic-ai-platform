import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "development-only-secret";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: "viewer" | "operator" | "admin";
  };
}

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      error: "authentication required"
    });
    return;
  }

  const token = authHeader.substring("Bearer ".length);

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    if (
      typeof payload !== "object" ||
      payload === null ||
      typeof payload.sub !== "string" ||
      typeof payload.email !== "string" ||
      !["viewer", "operator", "admin"].includes(
        payload.role as string
      )
    ) {
      res.status(401).json({
        error: "invalid token"
      });
      return;
    }

    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role as "viewer" | "operator" | "admin"
    };

    next();
  } catch {
    res.status(401).json({
      error: "invalid or expired token"
    });
  }
}
