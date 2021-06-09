#!/usr/bin/env bash

set -e

###################################################################
# Script Name : generate_envfile.sh
# Description	: Will get the env vars and put them in a env file for frontend builds.
# Args        : -
# Author      : Délio Amaral (C) 2020 - cloudoki
# Email       : delio@cloudoki.com
###################################################################

if [ "$CIRCLE_BRANCH" = "staging" ]; then

    echo "ENV=stg
CLOUD=${CLOUD_BUILD}
API_URL=${API_URL_STG}
MARKETPLACE_API_URL=${MARKETPLACE_API_URL_STG}
BILLING_API_URL=${BILLING_API_URL_STG}
SUPPORT_URL=${SUPPORT_URL_STG}" > .env

echo "$EXTENSIONS_STG" | base64 --decode > extensions.stg.json

elif [ "$CIRCLE_BRANCH" = "production" ]; then

    echo "ENV=prod
CLOUD=true
API_URL=${API_URL_PROD}
MARKETPLACE_API_URL=${MARKETPLACE_API_URL_PROD}
BILLING_API_URL=${BILLING_API_URL_PROD}
SUPPORT_URL=${SUPPORT_URL_PROD}" > .env

echo "$EXTENSIONS_PROD" | base64 --decode > extensions.prod.json
echo "$EXTENSIONS_CLOUD" | base64 --decode > extensions.cloud.json

else

  echo "ENV=dev
CLOUD=${CLOUD_BUILD}
API_URL=${API_URL_DEV}
MARKETPLACE_API_URL=${MARKETPLACE_API_URL_DEV}
BILLING_API_URL=${BILLING_API_URL_DEV}
SUPPORT_URL=${SUPPORT_URL_DEV}" > .env

echo "$EXTENSIONS_DEV" | base64 --decode > extensions.dev.json

fi
