/**
 * @file controllers/productos.controller.js
 * @module controllers/productos.controller
 * @description Controlador de productos
 * @namespace productosController
 */
import { productos } from "../models/productos.model.js";
import path from "path";
import fs from "fs";
import logHandler from "../utilities/logHandler.js";

const get = async (req, res) => {
  console.log("usuario: ", req.user);
  try {
    const Productos =
      await productos.obtenerTodosProductosActivosStockMayorCero();
    res.status(200).json({ success: true, data: Productos });
  } catch (error) {
    console.log("Error obteniendo los productos:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getByID = async (req, res) => {
  const { id } = req.params;
  console.log("parametros: ", id);
  try {
    const Productos = await productos.obtenerTodoPorID(id);
    console.log(Productos);
    res.status(200).json({ success: true, data: Productos });
  } catch (error) {
    console.log("Error obteniendo los productos:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const create = async (req, res) => {
  const productoBody = req.body;
  console.log("productoBody: ", productoBody);
  console.log("req.file: ", req.file); // Ya contiene los datos del archivo cargado

  let filePath = "";

  if (
    !productoBody.codigoProducto ||
    !productoBody.nombreProducto ||
    !productoBody.stockProducto ||
    !productoBody.costoProducto ||
    !productoBody.precioProducto
  ) {
    return res.status(400).json({
      success: false,
      message: "Por favor coloque todos los campos obligatorios.",
    });
  }

  try {
    if (req.file) {
      filePath = `backend/statics/${req.file.filename}`;
    }

    const resultado = await productos.insertar({
      ...productoBody,
      fotoProducto: filePath,
    });
    //falta modificar el SP para regresar el ID del nuevo producto creado
    logHandler({
      level: "info",
      message: "Producto creado",
      genericId: null,
      userId: req.user.id,
    });
    res.status(200).json({ success: true, data: resultado });
  } catch (error) {
    console.error("Error al crear producto:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const productoBody = req.body;
  let filePath = null;

  try {
    if (req.file) {
      filePath = `statics/${req.file.filename}`;
    }

    const productoActual = await productos.obtenerTodoPorID(id);
    console.log("productoActual: ", productoActual[0].FOTO);
    if (productoActual[0]?.FOTO) {
      const filePathAnterior = path.resolve(
        "backend/",
        `${productoActual[0].FOTO}`
      );

      if (fs.existsSync(filePathAnterior)) {
        fs.unlinkSync(filePathAnterior);
        console.log(`Archivo anterior eliminado: ${filePathAnterior}`);
      } else {
        console.warn(`Archivo anterior no encontrado: ${filePathAnterior}`);
      }
    }

    const resultado = await productos.actualizar({
      idProducto: id,
      ...productoBody,
      fotoProducto: filePath,
    });

    res.status(200).json({ success: true, data: resultado });
  } catch (error) {
    console.error("Error al actualizar producto:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const delete_ = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await productos.actualizar({
      idProducto: id,
      idEstado: 2,
    });

    res.status(200).json({ success: true, data: resultado });
  } catch (error) {
    console.error("Error in Delete product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const Producto = {
  get,
  getByID,
  create,
  update,
  delete_,
};

export { Producto };
