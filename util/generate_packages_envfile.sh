#!/usr/bin/env bash

set -e

###################################################################
# Script Name : generate_packages_envfile.sh
# Description	: Will get the env vars and put them in a env file for frontend builds.
# Args        : -
# Author      : Délio Amaral (C) 2020 - cloudoki
# Email       : delio@cloudoki.com
###################################################################

function generateEnvFiles() {
  # Map branch name to the environment

  if [[ $CIRCLE_BRANCH =~ develop$ ]]; then

    echo "ENV=dev
AUTH_URL=${AUTH_URL_STG}
API_URL=${API_URL_STG}
APP_URL=${APP_URL_DEV}
SUPPORT_URL=${SUPPORT_URL_DEV}
LOGIN_PORT=${LOGIN_PORT_DEV}
SIGNUP_PORT=${SIGNUP_PORT_DEV}" > ${ENV_FILE_APISUITE_SANDBOX_CLIENT}

  elif [[ $CIRCLE_BRANCH =~ [-]*rc[0-9]*$ ]]; then

    echo "ENV=stg
AUTH_URL=${AUTH_URL_STG}
API_URL=${API_URL_STG}
APP_URL=${APP_URL_STG}
SUPPORT_URL=${SUPPORT_URL_STG}
LOGIN_PORT=${LOGIN_PORT_STG}
SIGNUP_PORT=${SIGNUP_PORT_STG}" > ${ENV_FILE_APISUITE_SANDBOX_CLIENT}

  elif [[ $CIRCLE_BRANCH =~ master$ ]]; then

    echo "ENV=prod
AUTH_URL=${AUTH_URL_PROD}
API_URL=${API_URL_PROD}
APP_URL=${APP_URL_PROD}
SUPPORT_URL=${SUPPORT_URL_PROD}
LOGIN_PORT=${LOGIN_PORT_PROD}
SIGNUP_PORT=${SIGNUP_PORT_PROD}" > ${ENV_FILE_APISUITE_SANDBOX_CLIENT}

  fi

  sleep 3
}

ENV_FILE_APISUITE_SANDBOX_CLIENT=../packages/apisuite-client-sandbox/.env

# Generating env files
generateEnvFiles

if [[ ! -f ${ENV_FILE_APISUITE_SANDBOX_CLIENT} ]]; then
   echo "Failed to generate .env files"
   exit 1
fi
