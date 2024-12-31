import express from "express";
import { Usuario } from "../controllers/usuarios.controller.js";
import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
import usuarioValidator from "../middleware/validators/usuarioValidator.js";
import getDatosToken from "../controllers/datos_token.controller.js";
import { rolesDictionary } from "../utilities/rolesDictionary.js";

const router = express.Router();

router.get("/datos-token", checkAuth, getDatosToken); // Specific route for datos-token
router.get("/", checkAuth, checkRole([rolesDictionary.Operador]), Usuario.get);
router.get(
  "/:id",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  Usuario.getByID
); // General route for id
router.post(
  "/",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  Usuario.create
);
router.put(
  "/:id",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  Usuario.update
);
router.delete(
  "/:id",
  checkAuth,
  checkRole([rolesDictionary.Operador]),
  Usuario.delete_
);
router.post(
  "/login",
  usuarioValidator.loginUsuarioValidationRules,
  Usuario.login
);
router.post("/logout", checkAuth, Usuario.logout);

export default router;
