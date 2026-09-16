import type { CloudOpsService } from "./service.types.js";

export interface ServiceRepository {
  findAll(): CloudOpsService[];
}
