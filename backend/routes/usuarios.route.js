import express from "express";
import { Usuario } from "../controllers/usuarios.controller.js";
import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
const router = express.Router();

router.get("/", checkAuth, checkRole(["Super usuario"]), Usuario.get);
router.get("/:id", checkAuth, checkRole(["Super usuario"]), Usuario.getByID);
router.post("/", checkAuth, checkRole(["Super usuario"]), Usuario.create);
router.put("/:id", checkAuth, checkRole(["Super usuario"]), Usuario.update);
router.delete("/:id", checkAuth, checkRole(["Super usuario"]), Usuario.delete_);
router.post("/login", Usuario.login);
router.post("/logout", checkAuth, Usuario.logout);

export default router;
