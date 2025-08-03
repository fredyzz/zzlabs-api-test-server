# 🚀 Simple Test Node Server (TypeScript + Docker + Supabase)

A super basic Node.js server with Express.js and two test API routes, built with TypeScript for enhanced type safety and development experience. This project runs inside Docker and can be deployed to an EC2 instance using GitHub Actions with a self-hosted runner.

---

## 📁 Project Structure

``` text
mi-proyecto/
├── src/                # TypeScript source code
├── dist/               # Compiled output (auto-generated)
├── Dockerfile
├── docker-compose.yml
├── tsconfig.json
├── .env
├── Makefile
├── .github/workflows/deploy.yml
└── README.md
```

---

## ⚙️ .env Example

``` env
DATABASE_URL=postgresql://usuario:contraseña@host.supabase.co:5432/postgres
PORT=3000
```

---

## 🧪 Commands

### 🧪 Local (without Docker)

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

### 🐳 Docker (local or production)

```bash
# Construir la imagen
docker compose build

# Levantar el contenedor en segundo plano
docker compose up -d

# Ver logs en tiempo real
docker compose logs -f

# Detener los contenedores
docker compose down
```

### 🛠️ Makefile (opcional)

```bash
make build      # docker compose build
make up         # docker compose up -d
make down       # docker compose down
make restart    # reinicia la app (down → build → up)
make logs       # muestra logs en vivo
```

### ☁️ Manual deployment on EC2

```bash
cd /home/ubuntu/proyectos/mi-proyecto
git pull origin main
docker compose down
docker compose build
docker compose up -d
```

### 🔄 GitHub Actions (self-hosted runner)

```bash
# Start the runner manually (if not running)
cd ~/actions-runner
./run.sh
```

Or using PM2:

```bash
pm2 start ./run.sh --name github-runner
pm2 save
```

Or using systemd:

```bash
sudo systemctl enable github-runner
sudo systemctl start github-runner
```

---

## 🧰 Deployment Setup Summary

- Uses Docker and Docker Compose for containerization
- Connected to Supabase as the external Postgres database
- Deployed to an EC2 instance with a GitHub self-hosted runner
- Supports multiple projects using Nginx and subdomains
- Includes HTTPS with Let’s Encrypt (optional via Nginx config)

---

## 📌 To Do

- [ ] Add automated tests
- [ ] Set up staging environment
- [ ] Configure health checks

---

## ✍️ Author

Built with ❤️ by [Tu Nombre]
