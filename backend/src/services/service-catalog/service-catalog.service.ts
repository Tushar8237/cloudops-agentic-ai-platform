import type { CloudOpsService } from "../../domain/service/service.types.js";
import type { ServiceRepository } from "../../domain/service/service.repository.js";

export class ServiceCatalogService {
  constructor(private readonly repository: ServiceRepository) {}

  listServices(): CloudOpsService[] {
    return this.repository.findAll();
  }
}
