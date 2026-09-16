import express from "express";
import healthRouter from "./api/routes/health.routes.js";
import servicesRouter from "./api/routes/services.routes.js";
import authRouter from "./api/routes/auth.routes.js";

const app = express();

app.use(express.json());

app.use(healthRouter);
app.use(servicesRouter);
app.use(authRouter);

export default app;
