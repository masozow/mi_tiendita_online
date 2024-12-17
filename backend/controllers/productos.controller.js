import { productos } from "../models/productos.model.js";

const get = async (req, res) => {
  try {
    const Productos = await productos.obtenerTodo();
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
  const productoBody = req.body; // user will send this data

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
    const resultado = productos.insertar(productoBody);
    res.status(201).json({ success: true, data: resultado });
  } catch (error) {
    console.error("Error in Create product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const update = async (req, res) => {};

const delete_ = async (req, res) => {};

const Producto = {
  get,
  getByID,
  create,
  update,
  delete_,
};

export { Producto };
