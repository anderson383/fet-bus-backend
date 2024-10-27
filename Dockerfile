# Etapa 1: Dependencias
FROM node:18-alpine3.15 AS deps
# RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiar package.json y package-lock.json para instalar las dependencias
COPY package.json package-lock.json ./
RUN npm install

# Etapa 2: Construcción
FROM node:18-alpine3.15 AS builder
WORKDIR /app

# Copiar dependencias desde la etapa anterior
COPY --from=deps /app/node_modules ./node_modules

# Copiar el resto del código fuente
COPY . .

# Generar Prisma Client y construir la aplicación
RUN npm run prisma:generate-migrate
RUN npm run build

# Etapa 3: Imagen de producción
FROM node:18-alpine3.15 AS runner
WORKDIR /app

# Copiar todas las dependencias (desarrollo y producción) desde deps
COPY --from=deps /app/node_modules ./node_modules

# Copiar el build generado
COPY --from=builder /app/dist ./dist

# Copiar el package.json y el package-lock.json para el contexto de ejecución
COPY package.json package-lock.json ./

# Copiar los archivos de Prisma para que pueda ejecutarse en producción (si tienes un esquema)

COPY prisma ./prisma
RUN npm run prisma:generate-migrate

COPY .env .env

# Exponer el puerto de la aplicación (ajústalo si es necesario)
EXPOSE 3000

# Comando de inicio de la aplicación en modo producción
CMD ["node", "--max-old-space-size=4196", "dist/main"]
