import express from "express";
import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
import { Rol } from "../controllers/roles.controller.js";
import rolValidator from "../middleware/validators/rolValidator.js";

const router = express.Router();

router.get("/", checkAuth, checkRole(["Super usuario"]), Rol.get);
router.get(
  "/:id",
  checkAuth,
  checkRole(["Super usuario"]),
  rolValidator.getRolByIDValidationRules,
  Rol.getByID
);
router.post(
  "/",
  checkAuth,
  checkRole(["Super usuario"]),
  rolValidator.createRolValidationRules,
  Rol.create
);
router.put(
  "/:id",
  checkAuth,
  checkRole(["Super usuario"]),
  rolValidator.updateRolValidationRules,
  Rol.update
);
router.delete(
  "/:id",
  checkAuth,
  checkRole(["Super usuario"]),
  rolValidator.deleteRolValidationRules,
  Rol.delete_
);

export default router;
