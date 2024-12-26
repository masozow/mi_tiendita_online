import express from "express";
import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
import { Orden } from "../controllers/ordenes.controller.js";
import ordenValidator from "../middleware/validators/ordenesValidator.js";

const router = express.Router();

router.get("/", checkAuth, checkRole(["Super usuario"]), Orden.get);
router.get("/:id", checkAuth, ordenValidator.getOrdenByIDValidationRules, Orden.getByID);
router.get("/detalle/:id", checkAuth, ordenValidator.getOrdenByIDValidationRules, Orden.getDetalleByID);
router.get("/cliente/:id", checkAuth, ordenValidator.getOrdenByIDValidationRules, Orden.getByIDCliente);
router.post("/", checkAuth, ordenValidator.createOrdenValidationRules, Orden.create);
router.put("/:id", checkAuth, checkRole(["Super usuario"]), ordenValidator.updateOrdenValidationRules, Orden.update);
router.delete("/:id", checkAuth, checkRole(["Super usuario"]), ordenValidator.deleteOrdenValidationRules, Orden.delete_);
router.patch("/cancel/:id", checkAuth, ordenValidator.getOrdenByIDValidationRules, Orden.cancel);

export default router;
