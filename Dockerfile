# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем файлы package
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Копируем собранное приложение
COPY --from=builder /app/.output ./.output

# Устанавливаем переменные окружения
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

# Запускаем приложение
CMD ["node", ".output/server/index.mjs"]

