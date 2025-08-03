# Makefile

# Para desarrollo local (con ts-node-dev + autorecarga)
dev:
	docker compose -f docker-compose.dev.yml up

# Para detener el contenedor de desarrollo
dev-down:
	docker compose -f docker-compose.dev.yml down

# Para producción (compila + ejecuta dist)
up:
	docker compose -f docker-compose.yml up -d --build

# Para detener el contenedor de producción
down:
	docker compose -f docker-compose.yml down

# Ver logs (modo producción)
logs:
	docker logs -f zzlabs-test
