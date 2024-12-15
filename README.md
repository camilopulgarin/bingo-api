# Bingo API

Esta es una API REST para gestionar usuarios y otros recursos del proyecto Bingo. Está construida utilizando Node.js, Express, Sequelize (MySQL) y documentada con Swagger.

## Características

- CRUD de usuarios.
- Base de datos configurada con Sequelize y MySQL.
- Documentación interactiva con Swagger.
- Estructura modular y escalable.

---

## Requisitos previos

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [MySQL](https://www.mysql.com/) (versión 8 o superior)
- [Git](https://git-scm.com/)

---

## Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd bingo-api
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto con los siguientes valores:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_password
   DB_NAME=bingo_db
   DB_PORT=3306
   JWT_SECRET=tu_clave_secreta
   ```

4. **Configurar la base de datos:**
   Ejecuta los siguientes comandos para sincronizar los modelos:
   ```bash
   npx sequelize-cli db:create
   npx sequelize-cli db:migrate
   ```

---

## Uso

1. **Iniciar el servidor:**
   ```bash
   npm start
   ```

2. **Endpoints principales:**
   - Documentación Swagger: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
   - Base URL de la API: [http://localhost:3000/api/v1](http://localhost:3000/api/v1)

---

## Rutas principales

### Usuarios

| Método | Endpoint    | Descripción               |
|--------|-------------|---------------------------|
| GET    | `/users`    | Obtener todos los usuarios |
| POST   | `/users`    | Crear un usuario          |
| GET    | `/users/:id`| Obtener un usuario por ID |
| PUT    | `/users/:id`| Actualizar un usuario     |
| DELETE | `/users/:id`| Eliminar un usuario       |

---

## Estructura del proyecto

```plaintext
src
├── app
│   ├── controllers      # Controladores de la API
│   ├── routes           # Definición de rutas
├── domain
│   ├── models           # Definición de modelos de dominio
│   ├── repositories     # Repositorios para acceder a datos
│   ├── services         # Lógica de negocio
├── infrastructure
│   ├── database         # Configuración y modelos de Sequelize
│   ├── logger           # Configuración del logger
│   ├── swagger          # Configuración de Swagger
├── index.js             # Punto de entrada principal
```

---

## Documentación Swagger

Swagger está disponible en [http://localhost:3000/api-docs](http://localhost:3000/api-docs). Contiene información interactiva de todos los endpoints de la API.

### Ejemplo de anotación Swagger:

```javascript
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Retorna una lista de usuarios registrados.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 */
```

---

## Scripts disponibles

- **`npm start`**: Inicia el servidor en modo de producción.
- **`npm run dev`**: Inicia el servidor en modo de desarrollo con nodemon.
- **`npx sequelize-cli db:migrate`**: Ejecuta migraciones de base de datos.
- **`npx sequelize-cli db:seed:all`**: Ejecuta los seeders de base de datos.

---

## Contribuciones

1. Haz un fork del proyecto.
2. Crea una rama para tu nueva funcionalidad o corrección de errores:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Haz commit de tus cambios:
   ```bash
   git commit -m "Descripción de la funcionalidad"
   ```
4. Haz push de tu rama:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Abre un Pull Request.

---

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
