import express from "express";
import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
import { Operador } from "../controllers/operadores.controller.js";
import operadorValidator from "../middleware/validators/operadoresValidator.js";
import { rolesDictionary } from "../utilities/rolesDictionary.js";

const router = express.Router();

router.get(
  "/usuario/:id",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  Operador.getByUsuarioID
);
router.get("/", checkAuth, checkRole([rolesDictionary.Operador]), Operador.get);
router.get(
  "/:id",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  operadorValidator.getOperadorByIDValidationRules,
  Operador.getByID
);
router.post(
  "/",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  operadorValidator.createOperadorValidationRules,
  Operador.create
);
router.put(
  "/:id",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  operadorValidator.updateOperadorValidationRules,
  Operador.update
);
router.delete(
  "/:id",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  operadorValidator.deleteOperadorValidationRules,
  Operador.delete_
);

export default router;
