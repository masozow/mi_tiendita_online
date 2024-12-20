import express from "express";
import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
import { Rol } from "../controllers/roles.controller.js";

const router = express.Router();

router.get("/", checkAuth, checkRole(["Super usuario"]), Rol.get);
router.get("/:id", checkAuth, checkRole(["Super usuario"]), Rol.getByID);
router.post("/", checkAuth, checkRole(["Super usuario"]), Rol.create);
router.put("/:id", checkAuth, checkRole(["Super usuario"]), Rol.update);
router.delete("/:id", checkAuth, checkRole(["Super usuario"]), Rol.delete_);

export default router;
