import express from "express";
import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
import { Marca } from "../controllers/marcas_productos.controller.js";

const router = express.Router();

router.get("/", checkAuth, Marca.get);
router.get("/:id", checkAuth, Marca.getByID);
router.post("/", checkAuth, checkRole(["Super usuario"]), Marca.create);
router.put("/:id", checkAuth, checkRole(["Super usuario"]), Marca.update);
router.delete("/:id", checkAuth, checkRole(["Super usuario"]), Marca.delete_);

export default router;
