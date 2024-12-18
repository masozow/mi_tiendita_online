import express from "express";
import { Usuario } from "../controllers/usuarios.controller.js";

const router = express.Router();

router.get("/", Usuario.get);
router.get("/:id", Usuario.getByID);
router.post("/", Usuario.create);
router.put("/:id", Usuario.update);
router.delete("/:id", Usuario.delete_);
router.post("/login", Usuario.login);

export default router;
