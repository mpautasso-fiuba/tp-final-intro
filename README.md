# 🎮 Web Api Rest - Videojuegos

Este proyecto es una **API REST** sobre videojuegos y su comunidad. Permite a los usuarios consultar videojuegos, agregarlos y dejar comentarios sobre ellos.

Todo el sistema está **dockerizado**, lo que facilita su despliegue en cualquier entorno con Docker.

---

## 👥 Integrantes

- Rodrigo Luciano Ururi
- Manuel Pautasso

---

## 🔬 Herramientas utilizadas

- Para este proyecto se utiliza las siguientes herramientas:
Backend:
    - Node.js: Entorno de ejecución de JavaScript en el servidor.

    - Express.js: Framework para crear la API RESTful de la aplicación.

    - pg: Utilizado para que el backend interactue con la base de datos.

    - CORS: Se utiliza para permitir solicitudes entre diferentes dominios (front-end y back-end).

   - Nodemon: Herramienta para reiniciar automticamente el servidor en cada cambio en el codigo del backend.

- Frontend:
    - Bulma: Framework CSS moderno y responsivo utilizado para diseñar la interfaz las paginas HTML de videojuegos, desarrolladoras y comentarios.

---

## 🌍 Versión desplegada

Podés acceder a la versión en línea del proyecto a través de Render:

- 🔗 **Frontend:** [https://tp-final-intro-frontend.onrender.com/](https://tp-final-intro-frontend.onrender.com/)
- 🔗 **Backend (API REST):** [https://tp-final-intro-lfwl.onrender.com](https://tp-final-intro-lfwl.onrender.com)

> ⚠️ Tené en cuenta que Render puede tardar unos segundos en levantar los servicios si están "en reposo".

👉 **Si sigue fallando**, ingresá al siguiente URL manualmente para asegurarte de que el backend se active correctamente:  
[https://tp-final-intro-lfwl.onrender.com](https://tp-final-intro-lfwl.onrender.com)


### Nota
Estas versiones apuntan a la rama **production**.

---

## ⚙️ Requisitos

Para ejecutar el proyecto con Docker **no es necesario tener Node.js ni npm instalados** localmente.

### Requisitos mínimos:

- [Docker](https://www.docker.com/) v20+
- [Docker Compose](https://docs.docker.com/compose/)  
  _(en versiones modernas de Docker ya viene incluido)_

---

## 🚀 Despliegue con Docker

### Para levantar el frontend, backend y postgres a la vez
```bash
docker compose up -d
```

Esto iniciará:

- **Frontend** en `http://localhost:8080`
- **Backend** en `http://localhost:3000`
- **PostgreSQL** en `http://localhost:5432` 

---
### Tambien los puedes levantar por separado

#### 📂 Postgres:
```bash
docker compose up -d postgres
```
#### 🔧 Backend:
```bash
docker compose up -d backend
```
#### 🌐 Frontend:
```bash
docker compose up -d frontend
```


## Configuraciones

### 📂 Base de datos

Se configura dentro del archivo `docker-compose.yml` bajo el servicio `postgres`:

```yaml
environment:
  - POSTGRES_PASSWORD=postgres
  - POSTGRES_USER=postgres
  - POSTGRES_DB=videojuegos
```


---

### 🔧 Backend

Las variables de entorno del backend también están en `docker-compose.yml` (servicio `backend`):

```yaml
environment:
  - DB_HOST=postgres
  - DB_PORT=5432
  - DB_USER=postgres
  - DB_PASSWORD=postgres
  - DB_NAME=videojuegos
```

---


### 🌐 Frontend

La URL base del backend se define en el archivo:

```
/frontend/src/env.js
```

Ejemplo de contenido:

```js
  window._env_ = {
    API_URL: "http://localhost:3000/api/v1"
  };
```
