import express from "express";
import { Cliente } from "../controllers/clientes.controller.js";

const router = express.Router();

router.get("/", Cliente.get);
router.get("/:id", Cliente.getByID);
router.post("/", Cliente.create);
router.put("/:id", Cliente.update);
router.delete("/:id", Cliente.delete_);

export default router;
