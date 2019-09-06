FROM node:10.15.3-alpine

ENV OBSANDBOXAUTH_BRANDED=${OBSANDBOXAUTH_BRANDED}

WORKDIR /openbank-sandbox-auth-server

RUN apk update
RUN apk add --no-cache make gcc g++ python mysql-client

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json yarn.lock webpack.config.js .babelrc wait-for-it.sh ./

RUN chmod +x wait-for-it.sh
RUN yarn
# If you are building your code for production
# RUN npm install --only=production
# Bundle app source
COPY . .

RUN OBSANDBOXAUTH_BRANDED=${OBSANDBOXAUTH_BRANDED} yarn build-prod

EXPOSE 3000

CMD ["sh", "-c", "/openbank-sandbox-auth-server/wait-for-it.sh -- yarn start"]
