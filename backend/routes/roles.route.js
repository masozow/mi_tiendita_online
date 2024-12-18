import express from "express";
import { Rol } from "../controllers/roles.controller.js";

const router = express.Router();

router.get("/", Rol.get);
router.get("/:id", Rol.getByID);
router.post("/", Rol.create);
router.put("/:id", Rol.update);
router.delete("/:id", Rol.delete_);

export default router;
