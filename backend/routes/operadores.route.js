import express from "express";
import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
import { Operador } from "../controllers/operadores.controller.js";

const router = express.Router();

router.get("/", checkAuth, checkRole(["Super usuario"]), Operador.get);
router.get("/:id", checkAuth, checkRole(["Super usuario"]), Operador.getByID);
router.post("/", checkAuth, checkRole(["Super usuario"]), Operador.create);
router.put("/:id", checkAuth, checkRole(["Super usuario"]), Operador.update);
router.delete(
  "/:id",
  checkAuth,
  checkRole(["Super usuario"]),
  Operador.delete_
);

export default router;
