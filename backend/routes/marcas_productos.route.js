import express from "express";
import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
import { Marca } from "../controllers/marcas_productos.controller.js";
import marcaValidator from "../middleware/validators/marcas_productosValidator.js";

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
  checkRole(["Super usuario"]),
  marcaValidator.createMarcaValidationRules,
  Marca.create
);
router.put(
  "/:id",
  checkAuth,
  checkRole(["Super usuario"]),
  marcaValidator.updateMarcaValidationRules,
  Marca.update
);
router.delete(
  "/:id",
  checkAuth,
  checkRole(["Super usuario"]),
  marcaValidator.deleteMarcaValidationRules,
  Marca.delete_
);

export default router;
