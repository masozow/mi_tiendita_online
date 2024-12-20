import express from "express";
import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
import { Cliente } from "../controllers/clientes.controller.js";

const router = express.Router();

router.get("/", checkAuth, checkRole(["Super usuario"]), Cliente.get);
router.get("/:id", checkAuth, Cliente.getByID);
router.post("/", checkAuth, checkRole(["Super usuario"]), Cliente.create);
router.put("/:id", checkAuth, checkRole(["Super usuario"]), Cliente.update);
router.delete("/:id", checkAuth, checkRole(["Super usuario"]), Cliente.delete_);

export default router;
