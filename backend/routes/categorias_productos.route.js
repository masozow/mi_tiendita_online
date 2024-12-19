import express from "express";
import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
import { Categoria } from "../controllers/categorias_productos.controller.js";

const router = express.Router();

router.get("/", checkAuth, Categoria.get);
router.get("/:id", checkAuth, checkRole(["Super usuario"]), Categoria.getByID);
router.post("/", checkAuth, checkRole(["Super usuario"]), Categoria.create);
router.put("/:id", checkAuth, checkRole(["Super usuario"]), Categoria.update);
router.delete(
  "/:id",
  checkAuth,
  checkRole(["Super usuario"]),
  Categoria.delete_
);

export default router;
