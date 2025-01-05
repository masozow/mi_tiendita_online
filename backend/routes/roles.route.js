import express from "express";
import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
import { Rol } from "../controllers/roles.controller.js";
import rolValidator from "../middleware/validators/rolValidator.js";
import { rolesDictionary } from "../utilities/rolesDictionary.js";

const router = express.Router();

router.get("/", checkAuth, checkRole([rolesDictionary.Operador]), Rol.get);
router.get(
  "/:id",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  rolValidator.getRolByIDValidationRules,
  Rol.getByID
);
router.post(
  "/",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  rolValidator.createRolValidationRules,
  Rol.create
);
router.put(
  "/:id",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  rolValidator.updateRolValidationRules,
  Rol.update
);
router.delete(
  "/:id",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  rolValidator.deleteRolValidationRules,
  Rol.delete_
);

export default router;
