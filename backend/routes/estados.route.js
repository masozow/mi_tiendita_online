import express from "express";
import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
import { Estado } from "../controllers/estados.controller.js";
import estadoValidator from "../middleware/validators/estadosValidator.js";
import { rolesDictionary } from "../utilities/rolesDictionary.js";
const router = express.Router();

router.get("/", checkAuth, checkRole([rolesDictionary.Operador]), Estado.get);
router.get(
  "/:id",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  estadoValidator.getEstadoByIDValidationRules,
  Estado.getByID
);
router.post(
  "/",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  estadoValidator.createEstadoValidationRules,
  Estado.create
);
router.put(
  "/:id",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  estadoValidator.updateEstadoValidationRules,
  Estado.update
);
router.delete(
  "/:id",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  estadoValidator.deleteEstadoValidationRules,
  Estado.delete_
);

export default router;
