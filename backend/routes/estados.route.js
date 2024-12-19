import express from "express";
import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
import { Estado } from "../controllers/estados.controller.js";

const router = express.Router();

router.get("/", checkAuth, checkRole(["Super usuario"]), Estado.get);
router.get("/:id", checkAuth, checkRole(["Super usuario"]), Estado.getByID);
router.post("/", checkAuth, checkRole(["Super usuario"]), Estado.create);
router.put("/:id", checkAuth, checkRole(["Super usuario"]), Estado.update);
router.delete("/:id", checkAuth, checkRole(["Super usuario"]), Estado.delete_);

export default router;
