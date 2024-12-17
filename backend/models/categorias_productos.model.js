/**
 * @module models/categorias_productos.model
 * @description Modelo de categorias de productos.
 * Importa QueryTypes de Sequelize y la configuración de Sequelize de la base de datos.
 */

/**
 * Inserta una nueva categoría de productos.
 *
 * @param {string} nombreCategoria Nombre de la categoría.
 * @param {number} [idEstado=1] ID del estado de la categoría.
 * @returns {Promise<string>} Mensaje de resultado de la operación.
 */
const insertar = async (nombreCategoria, idEstado = 1) => {
  try {
    const resultado = await sequelize.query(
      `
      DECLARE @output_message nvarchar(255)
      EXEC sp_insertarCategoriaProducto @nombre= :nombreCategoria, 
                                        @idEstado= :idEstado, 
                                        @message=@output_message OUTPUT
      SELECT @output_message AS mensaje;
      `,
      {
        replacements: {
          nombreCategoria,
          idEstado,
        },
        type: QueryTypes.SELECT,
      }
    );
    const mensaje = resultado[0]?.mensaje;
    return mensaje;
  } catch (err) {
    console.error("Error al ejecutar el procedimiento:", err);
    throw err;
  }
};

/**
 * Actualiza una categoría de productos.
 *
 * @param {Object} datos Objeto con los datos de la categoría a actualizar.
 * @param {number} datos.id ID de la categoría a actualizar.
 * @param {string} [datos.nombre] Nuevo nombre de la categoría.
 * @param {number} [datos.idEstado] Nuevo ID del estado de la categoría.
 * @returns {Promise<string>} Mensaje de resultado de la operación.
 */
const actualizar = async ({ id, nombre = null, idEstado = null } = {}) => {
  try {
    const resultado = await sequelize.query(
      `
        DECLARE @output_message nvarchar(255)
        EXEC sp_actualizarCategoriaProducto @id= :id,
                                            @nombre= :nombre, 
                                            @idEstado= :idEstado, 
                                            @message=@output_message OUTPUT
        SELECT @output_message AS mensaje;
        `,
      {
        replacements: {
          id,
          nombre,
          idEstado,
        },
        type: QueryTypes.SELECT,
      }
    );
    const mensaje = resultado[0]?.mensaje;
    return mensaje;
  } catch (err) {
    console.error("Error al ejecutar el procedimiento:", err);
    throw err;
  }
};

/**
 * Obtiene todas las categorías de productos.
 *
 * @param {number} [idEstado=1] ID del estado de las categorías a obtener.
 * @returns {Promise<Object[]>} Array de objetos con los datos de las categorías.
 */
const obtenerTodo = async (idEstado = 1) => {
  try {
    const datos = await sequelize.query(
      "SELECT * FROM vw_ObtenerTodasCategorias WHERE ESTADO= :idEstado",
      {
        replacements: {
          idEstado,
        },
        type: QueryTypes.SELECT,
      }
    );
    console.log("Datos obtenidos de la vista:", datos);
    return datos;
  } catch (err) {
    console.error("Error al consultar la vista:", err);
  }
};

/**
 * Objeto que contiene los metodos para interactuar con la tabla de categorías de productos.
 *
 * @property {function} insertar Inserta una nueva categoría de productos.
 * @property {function} actualizar Actualiza una categoría de productos.
 * @property {function} obtenerTodo Obtiene todas las categorías de productos.
 */
const categorias = {
  insertar,
  actualizar,
  obtenerTodo,
};

export { categorias };
