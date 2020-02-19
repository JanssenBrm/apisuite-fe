#!/usr/bin/env bash

set -e

###################################################################
# Script Name : merge_env.sh
# Description	: Will merge the env file to have all the needed env vars.
# Args        : -
# Author      : Délio Amaral (C) 2019 - cloudoki
# Email       : delio@cloudoki.com
###################################################################

source ./environment
echo "Merge for env: $APISUITE_ENVIRONMENT"
echo "APISUITE_ENVIRONMENT=$APISUITE_ENVIRONMENT" >> .env
cat .$APISUITE_ENVIRONMENT.env >> .env

if [[ $(docker network ls | grep -c apisuite-network) == 0 ]]; then
  docker network create apisuite-network
fi
