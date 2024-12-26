import express from "express";
import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
import { Operador } from "../controllers/operadores.controller.js";
import operadorValidator from "../middleware/validators/operadoresValidator.js";

const router = express.Router();

router.get("/", checkAuth, checkRole(["Super usuario"]), Operador.get);
router.get(
  "/:id",
  checkAuth,
  checkRole(["Super usuario"]),
  operadorValidator.getOperadorByIDValidationRules,
  Operador.getByID
);
router.post(
  "/",
  checkAuth,
  checkRole(["Super usuario"]),
  operadorValidator.createOperadorValidationRules,
  Operador.create
);
router.put(
  "/:id",
  checkAuth,
  checkRole(["Super usuario"]),
  operadorValidator.updateOperadorValidationRules,
  Operador.update
);
router.delete(
  "/:id",
  checkAuth,
  checkRole(["Super usuario"]),
  operadorValidator.deleteOperadorValidationRules,
  Operador.delete_
);

export default router;
