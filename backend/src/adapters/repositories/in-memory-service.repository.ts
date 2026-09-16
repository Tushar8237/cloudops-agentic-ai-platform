import type { CloudOpsService } from "../../domain/service/service.types.js";
import type { ServiceRepository } from "../../domain/service/service.repository.js";

const services: CloudOpsService[] = [
  {
    id: "svc-payment-api",
    name: "payment-api",
    environment: "development",
    status: "healthy"
  },
  {
    id: "svc-user-api",
    name: "user-api",
    environment: "development",
    status: "healthy"
  }
];

export class InMemoryServiceRepository implements ServiceRepository {
  findAll(): CloudOpsService[] {
    return services;
  }
}