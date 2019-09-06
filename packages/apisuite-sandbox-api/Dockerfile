FROM node:10.15.3-alpine

WORKDIR /sandbox-api

RUN apk add --no-cache make gcc g++ python git

COPY package*.json ./

RUN yarn

COPY . .

RUN ./node_modules/.bin/knex migrate:latest

EXPOSE 3000

CMD yarn start