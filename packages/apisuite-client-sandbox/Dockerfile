# node 10.x with cypress dependencies
FROM cypress/base:10 AS build

WORKDIR /build
COPY . /build
RUN yarn install
RUN yarn run build

# This results in a single layer image
FROM nginx:1.17.3-alpine
COPY --from=build /build/dist /usr/share/nginx/apisuite-client-sandbox
COPY ./nginx/public.conf /etc/nginx/conf.d/default.conf
