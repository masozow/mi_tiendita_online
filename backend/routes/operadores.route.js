import express from "express";
import { Operador } from "../controllers/operadores.controller.js";

const router = express.Router();

router.get("/", Operador.get);
router.get("/:id", Operador.getByID);
router.post("/", Operador.create);
router.put("/:id", Operador.update);
router.delete("/:id", Operador.delete_);

export default router;
