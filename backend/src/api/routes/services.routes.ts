import { Router } from "express";
import { InMemoryServiceRepository } from "../../adapters/repositories/in-memory-service.repository.js";
import { ServiceCatalogService } from "../../services/service-catalog/service-catalog.service.js";
import { authenticateToken, type AuthenticatedRequest } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/rbac.middleware.js";


const router = Router();

const repository = new InMemoryServiceRepository();
const serviceCatalog = new ServiceCatalogService(repository);

router.get("/api/v1/services", authenticateToken, requireRole("viewer","operator", "admin"), (_req, res) => {
  const services = serviceCatalog.listServices();

  res.status(200).json({
    data: services
  });
});

router.post(
  "/api/v1/services/:serviceId/restart",
  authenticateToken,
  requireRole("operator", "admin"),
  (req: AuthenticatedRequest, res) => {
    res.status(200).json({
      message: "restart operation authorized",
      serviceId: req.params.serviceId,
      requestedBy: req.user
    });
  }
);

export default router;

