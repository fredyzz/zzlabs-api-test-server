# Imagen base: Node.js
FROM node:20-alpine

# 1. Crear carpeta de trabajo
WORKDIR /app

# 2. Copiar dependencias
COPY package*.json tsconfig.json ./

# 3. Instalar dependencias
RUN npm install

# 4. Copiar código fuente
COPY ./src ./src

# 5. Compilar TypeScript
RUN npm run build

# 6. Exponer puerto y comando final
EXPOSE 3000
CMD ["node", "dist/index.js"]