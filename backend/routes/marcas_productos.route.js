import express from "express";
import { Marca } from "../controllers/marcas_productos.controller.js";

const router = express.Router();

router.get("/", Marca.get);
router.get("/:id", Marca.getByID);
router.post("/", Marca.create);
router.put("/:id", Marca.update);
router.delete("/:id", Marca.delete_);

export default router;
