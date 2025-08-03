# Simple Test Node Server (TypeScript)

Un servidor Node.js minimalista con Express.js y TypeScript. Incluye rutas de prueba y soporte para despliegue con Docker, GitHub Actions y Makefile.

---

## 🧪 Comandos

### 🔧 Local (sin Docker)

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo (con autorecarga)
npm run dev

# Compilar TypeScript a JavaScript
npm run build

# Ejecutar código compilado
npm start
```

---

### 🐳 Con Docker

```bash
# Modo desarrollo (con autorecarga)
make dev

# Detener contenedor de desarrollo
make dev-down

# Producción (compilar y levantar contenedor)
make up

# Detener contenedor de producción
make down

# Ver logs de producción
make logs
```

---

## 🚀 Deploy automático con GitHub Actions

En cada `push` a `main`, tu servidor autoejecutará:

- `git reset --hard origin/main`
- Creación de `.env` con los `GitHub Secrets`
- `make up` para build y deploy con Docker

---

## 📦 Variables de entorno

Definidas como **Secrets** en GitHub:

- `PORT`
- `TEST_SECRET`
- `DATABASE_URL` (si aplica)

Se escriben automáticamente en un `.env` en cada deploy.
