import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
import express from "express";
import { Producto } from "../controllers/productos.controller.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", checkAuth, Producto.get);
router.get("/:id", checkAuth, Producto.getByID);
router.post(
  "/",
  checkAuth,
  checkRole(["Super usuario"]),
  upload.single("file"),
  Producto.create
);
router.put(
  "/:id",
  checkAuth,
  checkRole(["Super usuario"]),
  upload.single("file"),
  Producto.update
);
router.delete(
  "/:id",
  checkAuth,
  checkRole(["Super usuario"]),
  Producto.delete_
);

export default router;
