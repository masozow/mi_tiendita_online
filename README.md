# mi_tiendita_online
Repositorio para el desafio Web.

Para poder usar el proyecto, se debe tener un archivo .env con estas variables:

NODE_ENV="dev" #"prod"

DB_USER='el usuario que tenga la bd'

DB_PASSWORD='el password que se le asigne a la bd'

DB_SERVER='la dirección del servidor'

DB_DATABASE='el nombre de la bd'

JWT_SECRET='alguna clave'

COOKIE_SECRET='alguna clave'

BCRYPT_SALT_ROUNDS=##

PORT=####

UPLOAD_FOLDER="backend/statics"


Luego instalar las dependencias con npm install, y levantar el servidor de desarrollo con npm run dev.

Para iniciar a probar los endpoints, primero se debe usar el endpoint de LOGIN, localizado en las rutas de Usuarios. Con eso se adquiere la cookie y el token para probar los demas endpoints. Las indicaciones y las credenciales ya fueron compartidas en las colecciones de POSTMAN.
