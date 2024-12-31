import express from "express";
import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
import { Cliente } from "../controllers/clientes.controller.js";
import clienteValidator from "../middleware/validators/clientesValidator.js";
import { rolesDictionary } from "../utilities/rolesDictionary.js";
const router = express.Router();

router.get("/", checkAuth, checkRole([rolesDictionary.Operador]), Cliente.get);
router.get(
  "/:id",
  checkAuth,
  clienteValidator.getClienteByIDValidationRules,
  Cliente.getByID
);
router.post(
  "/",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  clienteValidator.createClienteValidationRules,
  Cliente.create
);
router.put(
  "/:id",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  clienteValidator.updateClienteValidationRules,
  Cliente.update
);
router.delete(
  "/:id",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  clienteValidator.deleteClienteValidationRules,
  Cliente.delete_
);

export default router;
