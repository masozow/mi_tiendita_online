import express from "express";
import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
import { Marca } from "../controllers/marcas_productos.controller.js";
import marcaValidator from "../middleware/validators/marcas_productosValidator.js";
import { rolesDictionary } from "../utilities/rolesDictionary.js";

const router = express.Router();

router.get("/", checkAuth, Marca.get);
router.get(
  "/:id",
  checkAuth,
  marcaValidator.getMarcaByIDValidationRules,
  Marca.getByID
);
router.post(
  "/",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  marcaValidator.createMarcaValidationRules,
  Marca.create
);
router.put(
  "/:id",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  marcaValidator.updateMarcaValidationRules,
  Marca.update
);
router.delete(
  "/:id",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  marcaValidator.deleteMarcaValidationRules,
  Marca.delete_
);

export default router;
