import express from "express";
import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
import { Categoria } from "../controllers/categorias_productos.controller.js";
import categoriaValidator from "../middleware/validators/categorias_productosValidator.js";

const router = express.Router();

router.get("/", checkAuth, Categoria.get);
router.get(
  "/:id",
  checkAuth,
  checkRole(["Super usuario"]),
  categoriaValidator.getCategoriaByIDValidationRules,
  Categoria.getByID
);
router.post(
  "/",
  checkAuth,
  checkRole(["Super usuario"]),
  categoriaValidator.createCategoriaValidationRules,
  Categoria.create
);
router.put(
  "/:id",
  checkAuth,
  checkRole(["Super usuario"]),
  categoriaValidator.updateCategoriaValidationRules,
  Categoria.update
);
router.delete(
  "/:id",
  checkAuth,
  checkRole(["Super usuario"]),
  categoriaValidator.deleteCategoriaValidationRules,
  Categoria.delete_
);

export default router;
