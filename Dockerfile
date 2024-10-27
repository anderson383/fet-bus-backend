# Etapa 1: Dependencias
FROM node:18-alpine3.15 AS deps
WORKDIR /app

# Copiar package.json y package-lock.json para instalar las dependencias de desarrollo
COPY package.json package-lock.json ./
RUN npm install --only=dev  # Solo instalar dependencias de desarrollo

# Etapa 2: Construcción
FROM node:18-alpine3.15 AS builder
WORKDIR /app

# Copiar dependencias desde la etapa anterior
COPY --from=deps /app/node_modules ./node_modules

# Copiar el resto del código fuente
COPY . .

# Recibir variables de entorno como argumentos de build
ARG DATABASE_URL
ARG NODE_ENV
ARG AWS_ACCESS_KEY
ARG AWS_SECRET_ACCESS_KEY

ENV DATABASE_URL=$DATABASE_URL
ENV AWS_ACCESS_KEY=$AWS_ACCESS_KEY
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY

# Generar Prisma Client y construir la aplicación
RUN npm run prisma:generate-migrate
RUN npm run build

# Etapa 3: Imagen de producción
FROM node:18-alpine3.15 AS runner
WORKDIR /app

# Copiar solo las dependencias necesarias para producción
COPY --from=builder /app/node_modules ./node_modules

# Copiar el build generado
COPY --from=builder /app/dist ./dist

# Copiar el package.json y el package-lock.json para el contexto de ejecución
COPY package.json package-lock.json ./

# Copiar los archivos de Prisma para que pueda ejecutarse en producción
COPY prisma ./prisma

RUN npm run prisma:generate-migrate

ENV DATABASE_URL=$DATABASE_URL \
    AWS_ACCESS_KEY=$AWS_ACCESS_KEY \
    AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY

# Exponer el puerto de la aplicación (ajústalo si es necesario)
EXPOSE 3000

# Comando de inicio de la aplicación en modo producción
CMD ["node", "--max-old-space-size=4196", "dist/main"]
