# 1. Используем Node.js для сборки React-приложения
FROM node:16 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --frozen-lockfile

COPY . .
RUN npm run build

# 2. Используем Nginx для раздачи статических файлов
FROM nginx:alpine

# Удаляем дефолтную конфигурацию
RUN rm /etc/nginx/conf.d/default.conf

# Копируем конфиг для Nginx
COPY ./Docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Копируем собранные файлы React
COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
