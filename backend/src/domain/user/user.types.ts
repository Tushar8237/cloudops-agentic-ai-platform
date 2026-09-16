export type UserRole = "viewer" | "operator" | "admin";

export interface CloudOpsUser {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}
