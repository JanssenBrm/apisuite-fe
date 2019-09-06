FROM node:10 AS build
LABEL maintainer="David Lefever <david.lefever@bnpparibasfortis.com>"

ARG apiURL
ARG recaptchaKey
ARG DEV_PORTAL_CLIENT_ID_ARG
ARG DEV_PORTAL_CLIENT_SECRET_ARG
ENV DEV_PORTAL_CLIENT_ID=${DEV_PORTAL_CLIENT_ID_ARG}
ENV DEV_PORTAL_CLIENT_SECRET=${DEV_PORTAL_CLIENT_SECRET_ARG}

WORKDIR /build
COPY . /build
RUN npm install -g cross-env
RUN yarn install
RUN yarn audit
RUN yarn test
RUN API_URL=${apiURL} RECAPTCHA_KEY=${recaptchaKey} DEV_PORTAL_CLIENT_ID=${DEV_PORTAL_CLIENT_ID_ARG} DEV_PORTAL_CLIENT_SECRET=${DEV_PORTAL_CLIENT_SECRET_ARG} yarn run build

# This results in a single layer image
FROM nginx
COPY --from=build /build/dist /usr/share/nginx/bnp-appcenter-frontend-beta
COPY ./nginx/public.conf /etc/nginx/conf.d/default.conf
