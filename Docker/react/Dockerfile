# 1. Используем Node.js для сборки проекта
FROM node:16 AS build

WORKDIR /usr/src/app

# Копируем package.json и устанавливаем только production-зависимости
COPY package*.json ./
RUN npm install --frozen-lockfile

# Копируем весь код и собираем React-приложение
COPY . .
RUN npm run build

# 2. Минимальный образ Node.js для запуска
FROM node:16-alpine

WORKDIR /usr/src/app

# Устанавливаем только нужный пакет serve
RUN npm install -g serve && npm cache clean --force

# Копируем только собранные файлы, без исходников
COPY --from=build /usr/src/app/build /usr/src/app/build

# Открываем порт 3000
EXPOSE 3000

# Запускаем serve
CMD ["serve", "-s", "build", "-l", "3000"]
