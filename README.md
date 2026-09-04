# 📦 Sistema de Inventario Simple (MERN + TypeScript)

Este es el **repositorio semilla** para el curso de **Git / GitLab** con arquitectura **MERN (MongoDB, Express, React, Node.js)** utilizando **TypeScript** y **Tailwind CSS**.

---

## 🚀 Requisitos Previos

- [Node.js](https://nodejs.org/) v18 o superior.
- [Git](https://git-scm.com/) instalado.
- Cuenta activa en [GitLab](https://gitlab.com).
- Cuenta activa y clúster gratuito en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

---

## ⚙️ Configuración Inicial del Proyecto

### 1. Clonar el repositorio
```bash
git clone git@gitlab.com:tu-usuario/inventario-app.git
cd inventario-app
```

### 2. Configurar el Backend (`server/`)
```bash
cd server
npm install

# Copiar el archivo de variables de entorno
cp .env.example .env
```
Abre `.env` y coloca tu cadena de conexión de **MongoDB Atlas**:
```env
PORT=5000
MONGO_URI=mongodb+srv://usuario:password@cluster0.mongodb.net/inventario_db?retryWrites=true&w=majority
```

Poblar la base de datos con 5 productos iniciales:
```bash
npm run seed
```

Iniciar el servidor backend en modo desarrollo:
```bash
npm run dev
# Servidor corriendo en http://localhost:5000
```

---

### 3. Configurar el Frontend (`client/`)
En otra pestaña de la terminal:
```bash
cd client
npm install
npm run dev
# Frontend corriendo en http://localhost:5173
```

---

## 🌿 Flujo de Trabajo en Git

> ⚠️ **Regla de Oro:** ¡Nunca hagas commits directos sobre la rama `main`!

1. Asegúrate de tener `main` actualizado:
   ```bash
   git switch main
   git pull
   ```
2. Crea tu rama de funcionalidad:
   ```bash
   git switch -c feature/nombre-de-tu-tarea
   ```
3. Trabaja en tu código y revisa el estado:
   ```bash
   git status
   ```
4. Agrega los cambios y haz un commit con mensaje semántico:
   ```bash
   git add .
   git commit -m "feat: agrega visualización de productos en tabla"
   ```
5. Publica tu rama en GitLab:
   ```bash
   git push -u origin feature/nombre-de-tu-tarea
   ```
6. Ve a GitLab, crea el **Merge Request (MR)**, solicita revisión y fusiónalo a `main`.
7. Actualiza tu entorno local:
   ```bash
   git switch main
   git pull
   git branch -d feature/nombre-de-tu-tarea
   ```
