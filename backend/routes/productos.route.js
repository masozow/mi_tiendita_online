import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
import express from "express";
import { Producto } from "../controllers/productos.controller.js";

const router = express.Router();

router.get("/", checkAuth, Producto.get);
router.get("/:id", checkAuth, Producto.getByID);
router.post("/", checkAuth, checkRole(["Super usuario"]), Producto.create);
router.put("/:id", checkAuth, checkRole(["Super usuario"]), Producto.update);
router.delete(
  "/:id",
  checkAuth,
  checkRole(["Super usuario"]),
  Producto.delete_
);

export default router;
