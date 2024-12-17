import express from "express";
import { Producto } from "../controllers/productos.controller.js";

const router = express.Router();

router.get("/", Producto.get);
router.get("/:id", Producto.getByID);
// router.put("/:id", updateProduct);
// router.delete("/:id", deleteProduct);

export default router;
