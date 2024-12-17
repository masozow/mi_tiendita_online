import express from "express";
import { Producto } from "../controllers/productos.controller.js";

const router = express.Router();

router.get("/", Producto.get);
router.get("/:id", Producto.getByID);
router.post("/", Producto.create);
router.put("/:id", Producto.update);
router.delete("/:id", Producto.delete_);

export default router;
