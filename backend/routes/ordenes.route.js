import express from "express";
import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
import { Orden } from "../controllers/ordenes.controller.js";
import ordenValidator from "../middleware/validators/ordenesValidator.js";
import { rolesDictionary } from "../utilities/rolesDictionary.js";

const router = express.Router();

router.get("/", checkAuth, checkRole([rolesDictionary.Operador]), Orden.get);
router.get(
  "/:id",
  checkAuth,
  ordenValidator.getOrdenByIDValidationRules,
  Orden.getByID
);
router.get(
  "/detalle/:id",
  checkAuth,
  ordenValidator.getOrdenByIDValidationRules,
  Orden.getDetalleByID
);
router.get(
  "/cliente/:id",
  checkAuth,
  ordenValidator.getOrdenByIDValidationRules,
  Orden.getByIDCliente
);
router.post(
  "/",
  checkAuth,
  // ordenValidator.createOrdenValidationRules, //quitadas por ahora, para revisar que funcionen bien
  Orden.create
);
router.put(
  "/:id",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  // ordenValidator.updateOrdenValidationRules,
  Orden.update
);
router.delete(
  "/:id",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  ordenValidator.deleteOrdenValidationRules,
  Orden.delete_
);
router.patch(
  "/cancel/:id",
  checkAuth,
  ordenValidator.getOrdenByIDValidationRules,
  Orden.cancel
);

export default router;
