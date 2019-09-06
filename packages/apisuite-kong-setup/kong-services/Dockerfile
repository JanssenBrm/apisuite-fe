FROM node:8.9.1-alpine

WORKDIR /appcenter

COPY setup.js package.json yarn.lock ./

RUN apk update
RUN apk add python
RUN apk add make
RUN apk add g++

RUN yarn

EXPOSE 3000

CMD node setup.js
