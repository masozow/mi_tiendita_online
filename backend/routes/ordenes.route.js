import express from "express";
import { Orden } from "../controllers/ordenes.controller.js";

const router = express.Router();

router.get("/", Orden.get);
router.get("/:id", Orden.getByID);
router.get("/cliente/:id", Orden.getByIDCliente);
router.get("/detalle/:id", Orden.getDetalleByID);
router.post("/", Orden.create);
router.put("/:id", Orden.update);
router.delete("/:id", Orden.delete_);

export default router;
