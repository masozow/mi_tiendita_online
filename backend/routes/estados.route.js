import express from "express";
import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
import { Estado } from "../controllers/estados.controller.js";
import estadoValidator from "../middleware/validators/estadosValidator.js";

const router = express.Router();

router.get("/", checkAuth, checkRole(["Super usuario"]), Estado.get);
router.get(
  "/:id",
  checkAuth,
  checkRole(["Super usuario"]),
  estadoValidator.getEstadoByIDValidationRules,
  Estado.getByID
);
router.post(
  "/",
  checkAuth,
  checkRole(["Super usuario"]),
  estadoValidator.createEstadoValidationRules,
  Estado.create
);
router.put(
  "/:id",
  checkAuth,
  checkRole(["Super usuario"]),
  estadoValidator.updateEstadoValidationRules,
  Estado.update
);
router.delete(
  "/:id",
  checkAuth,
  checkRole(["Super usuario"]),
  estadoValidator.deleteEstadoValidationRules,
  Estado.delete_
);

export default router;
