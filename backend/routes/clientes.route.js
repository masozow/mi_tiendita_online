import express from "express";
import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
import { Cliente } from "../controllers/clientes.controller.js";
import clienteValidator from "../middleware/validators/clientesValidator.js";

const router = express.Router();

router.get("/", checkAuth, checkRole(["Super usuario"]), Cliente.get);
router.get(
  "/:id",
  checkAuth,
  clienteValidator.getClienteByIDValidationRules,
  Cliente.getByID
);
router.post(
  "/",
  checkAuth,
  checkRole(["Super usuario"]),
  clienteValidator.createClienteValidationRules,
  Cliente.create
);
router.put(
  "/:id",
  checkAuth,
  checkRole(["Super usuario"]),
  clienteValidator.updateClienteValidationRules,
  Cliente.update
);
router.delete(
  "/:id",
  checkAuth,
  checkRole(["Super usuario"]),
  clienteValidator.deleteClienteValidationRules,
  Cliente.delete_
);

export default router;
