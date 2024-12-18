import express from "express";
import { Estado } from "../controllers/estados.controller.js";

const router = express.Router();

router.get("/", Estado.get);
router.get("/:id", Estado.getByID);
router.post("/", Estado.create);
router.put("/:id", Estado.update);
router.delete("/:id", Estado.delete_);

export default router;
