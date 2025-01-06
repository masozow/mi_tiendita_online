/**
 * @file controllers/productos.controller.js
 * @module controllers/productos.controller
 * @description Controlador de productos
 * @namespace productosController
 */
import { productos } from "../models/productos.model.js";
import path from "path";
import fs from "fs";
import { errorAndLogHandler, errorLevels } from "../utilities/errorHandler.js";

const get = async (req, res) => {
  try {
    const Productos = await productos.obtenerTodo();
    res.status(200).json({ success: true, data: Productos });
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error obteniendo los productos: ` + error.message,
        userId: req.user.id,
      })
    );
  }
};

const getActivos = async (req, res) => {
  const { idMarca, idCategoria } = req.params;
  try {
    const Productos = await productos.obtenerTodosProductosActivos(
      idMarca,
      idCategoria
    );
    res.status(200).json({ success: true, data: Productos });
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error obteniendo los productos: ` + error.message,
        userId: req.user.id,
      })
    );
  }
};

const getActivosConStock = async (req, res) => {
  try {
    const Productos =
      await productos.obtenerTodosProductosActivosStockMayorCero();
    res.status(200).json({ success: true, data: Productos });
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error obteniendo los productos: ` + error.message,
        userId: req.user.id,
      })
    );
  }
};

const getByID = async (req, res) => {
  const { id } = req.params;
  try {
    const Productos = await productos.obtenerTodoPorID(id);
    res.status(200).json({ success: true, data: Productos });
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error obteniendo el producto: ${id} ` + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
  }
};

const create = async (req, res) => {
  const productoBody = req.body;
  let filePath = "";
  if (
    !productoBody.codigoProducto ||
    !productoBody.nombreProducto ||
    !productoBody.stockProducto ||
    !productoBody.costoProducto ||
    !productoBody.precioProducto
  ) {
    return res.status(400).json({
      success: errorLevels.warn,
      message: "Por favor coloque todos los campos obligatorios.",
    });
  }

  try {
    if (req.file) {
      filePath = `${req.file.filename}`;
    }
    console.log("File uploaded to:", filePath);
    const resultado = await productos.insertar({
      ...productoBody,
      fotoProducto: filePath,
    });
    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: resultado[0].mensaje + "/ Insertar Producto",
        genericId: resultado[0].id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error agregando el producto: ` + error.message,
        userId: req.user.id,
      })
    );
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const productoBody = req.body;
  let filePath = null;
  console.log("file: ", req.file);
  console.log("body: ", req.body);
  try {
    if (req.file) {
      filePath = `${req.file.filename}`;
      console.log("File uploaded to:", filePath);
    } else {
      console.log("No file uploaded");
    }
    console.log("filepath: ", filePath);
    const productoActual = await productos.obtenerTodoPorID(id);
    if (productoActual[0]?.FOTO) {
      const filePathAnterior = path.resolve(`${productoActual[0].FOTO}`);

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

    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message:
          resultado[0].mensaje +
          JSON.stringify({ ...productoBody, fotoProducto: filePath }) +
          "/ Actualizar Producto",
        genericId: id,
        userId: req.user?.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error actualizando el producto: ` + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
  }
};

const delete_ = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await productos.actualizar({
      idProducto: id,
      idEstado: 2,
    });

    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: resultado[0].mensaje + "/ Eliminar Producto",
        genericId: id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: "Error eliminando el cliente: " + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
  }
};

const Producto = {
  get,
  getActivos,
  getActivosConStock,
  getByID,
  create,
  update,
  delete_,
};

export { Producto };
