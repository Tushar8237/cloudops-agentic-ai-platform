import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { CloudOpsUser } from "../../domain/user/user.types.js";

const JWT_SECRET = process.env.JWT_SECRET || "development-only-secret";

const users: CloudOpsUser[] = [
  {
    id: "user-admin-001",
    email: "admin@cloudops.local",
    passwordHash: bcrypt.hashSync("Admin123!", 10),
    role: "admin"
  },
  {
    id: "user-operator-001",
    email: "operator@cloudops.local",
    passwordHash: bcrypt.hashSync("Operator123!", 10),
    role: "operator"
  },
  {
    id: "user-viewer-001",
    email: "viewer@cloudops.local",
    passwordHash: bcrypt.hashSync("Viewer123!", 10),
    role: "viewer"
  }
];

export interface AuthResult {
  token: string;
  user: {
    id: string;
    email: string;
    role: CloudOpsUser["role"];
  };
}

export async function authenticate(
  email: string,
  password: string
): Promise<AuthResult | null> {
  const user = users.find((candidate) => candidate.email === email);

  if (!user) {
    return null;
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);

  if (!validPassword) {
    return null;
  }

  const token = jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    {
      expiresIn: "1h"
    }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  };
}