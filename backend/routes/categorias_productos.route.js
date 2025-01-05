import express from "express";
import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
import { Categoria } from "../controllers/categorias_productos.controller.js";
import categoriaValidator from "../middleware/validators/categorias_productosValidator.js";
import { rolesDictionary } from "../utilities/rolesDictionary.js";
const router = express.Router();

router.get("/", checkAuth, Categoria.get);
router.get(
  "/:id",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  categoriaValidator.getCategoriaByIDValidationRules,
  Categoria.getByID
);
router.post(
  "/",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  categoriaValidator.createCategoriaValidationRules,
  Categoria.create
);
router.put(
  "/:id",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  categoriaValidator.updateCategoriaValidationRules,
  Categoria.update
);
router.delete(
  "/:id",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  categoriaValidator.deleteCategoriaValidationRules,
  Categoria.delete_
);

export default router;
