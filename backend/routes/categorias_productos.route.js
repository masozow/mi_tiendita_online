import express from "express";
import { Categoria } from "../controllers/categorias_productos.controller.js";

const router = express.Router();

router.get("/", Categoria.get);
router.get("/:id", Categoria.getByID);
router.post("/", Categoria.create);
router.put("/:id", Categoria.update);
router.delete("/:id", Categoria.delete_);

export default router;
