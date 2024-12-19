import express from "express";
import { Usuario } from "../controllers/usuarios.controller.js";
import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
const router = express.Router();

router.get("/", checkAuth, checkRole(["Super usuario"]), Usuario.get);
router.get("/:id", Usuario.getByID);
router.post("/", Usuario.create);
router.put("/:id", Usuario.update);
router.delete("/:id", Usuario.delete_);
router.post("/login", Usuario.login);

export default router;
