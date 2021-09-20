# FIRST STAGE
FROM node:latest as node

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build --prod


#SECOND STAGE

FROM nginx:alpine

COPY --from=node /app/dist/BunnyPayPIM /usr/share/nginx/html


