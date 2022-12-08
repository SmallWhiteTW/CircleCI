FROM node:lts-alpine as build-stage

WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . .

ARG BUILD_ENV
RUN echo ${BUILD_ENV}
RUN npm run build

# 安裝 serve 在 global
RUN npm install -g serve

EXPOSE 80
CMD ["serve", "-s", "/app/dist", "-p", "80"]
