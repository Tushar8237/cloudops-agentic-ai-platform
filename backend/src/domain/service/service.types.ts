export interface CloudOpsService {
  id: string;
  name: string;
  environment: string;
  status: "healthy" | "degraded" | "unhealthy" | "unknown";
}
