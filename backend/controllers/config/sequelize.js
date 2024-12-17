import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import tedious from 'tedious';

dotenv.config();
const sequelize = new Sequelize({
  dialect: 'mssql',
  host: process.env.DB_SERVER, // Dirección del servidor
  port: 1433,                  // Cambia el puerto si no es el predeterminado
  database: process.env.DB_DATABASE, // Nombre de la base de datos
  username: process.env.DB_USER,     // Usuario de la base de datos
  password: process.env.DB_PASSWORD, // Contraseña del usuario
  dialectOptions: {
    options: {
      encrypt: false,               // Cambia a true si usas SSL
      trustServerCertificate: true, // Cambia a true para entornos locales
    },
  },
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexión exitosa con la base de datos.');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
}

testConnection();


// const sequelize = new Sequelize({
//     dialect: MsSqlDialect,
//     server: 'masozow-pc',
//     port: 1433,
//     database: 'GDA0048-OT_Marving-Velasquez',
//     authentication: {
//       type: 'default',
//       options: {
//         userName: '',
//         password: '',
//         // encrypt: true, // for azure
//         trustServerCertificate: true // change to true for local dev / self-signed certs
//       },
//     }
//     // ,
//     // logging: console.log, // O usa false para deshabilitar logs
//   });
// Probar la conexión
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente.');
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos: \n', error);
  });

export default sequelize;