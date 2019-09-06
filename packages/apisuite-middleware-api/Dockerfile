FROM node:10.15.3-alpine

WORKDIR /openbank-middleware-api

RUN apk update
# todo remove 'curl openssl jq' needed for the sentia script
RUN apk add --no-cache make gcc g++ python mysql-client curl openssl jq bash

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . .

RUN rm -rf node_modules
RUN chmod +x wait-for-it.sh
RUN npm install -g node-gyp
RUN yarn

# RUN npm rebuild bcrypt --build-from-source
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source

RUN yarn run doc

EXPOSE 3000

CMD ["sh", "-c", "/openbank-middleware-api/wait-for-it.sh -- yarn start"]
