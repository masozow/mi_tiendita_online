import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
import express from "express";
import { Producto } from "../controllers/productos.controller.js";
import { upload } from "../middleware/upload.js";
import productoValidator from "../middleware/validators/productosValidator.js";
import SchemaFields from "../middleware/validators/schemaFields.js";

const router = express.Router();

router.get("/", checkAuth, Producto.get);
router.get(
  "/:id",
  checkAuth,
  productoValidator.getProductoByIDValidationRules,
  Producto.getByID
);
router.post(
  "/",
  checkAuth,
  checkRole(["Super usuario"]),
  upload.single(SchemaFields.FOTO_PRODUCTO),
  productoValidator.createProductoValidationRules,
  Producto.create
);
router.put(
  "/:id",
  checkAuth,
  checkRole(["Super usuario"]),
  upload.single(SchemaFields.FOTO_PRODUCTO),
  productoValidator.updateProductoValidationRules,
  Producto.update
);
router.delete(
  "/:id",
  checkAuth,
  checkRole(["Super usuario"]),
  productoValidator.deleteProductoValidationRules,
  Producto.delete_
);

export default router;
