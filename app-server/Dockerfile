# Dockerfile

FROM node:16-alpine

RUN apk update && apk add bash

RUN mkdir -p /app-server
WORKDIR /app-server

COPY . /app-server
RUN npm install
RUN npm run build
RUN npx prisma db seed
CMD npm run start:prod