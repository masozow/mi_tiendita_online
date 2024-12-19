import express from "express";
import { checkAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/roleAuth.js";
import { Orden } from "../controllers/ordenes.controller.js";

const router = express.Router();

router.get("/", checkAuth, checkRole(["Super usuario"]), Orden.get);
//Pensar bien la lógica, porque el cliente debe poder ver el detalle de cada una de sus órdenes,
//para eso debe acceder a las rutas /:id y /detalle/:id, al dar click en el frontend en las ordenes que le
//corresponden, pero no debería poder ver las órdenes de otros clientes, tal vez se necesiten
//dos rutas distintas
router.get("/:id", checkAuth, Orden.getByID);
router.get("/detalle/:id", checkAuth, Orden.getDetalleByID);
router.get("/cliente/:id", checkAuth, Orden.getByIDCliente);
router.post("/", checkAuth, Orden.create);
router.put("/:id", checkAuth, checkRole(["Super usuario"]), Orden.update);
router.delete("/:id", checkAuth, checkRole(["Super usuario"]), Orden.delete_);
router.patch("/cancel/:id", checkAuth, Orden.cancel);

export default router;
