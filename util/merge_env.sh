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
cat .$APISUITE_ENVIRONMENT.env >> .env
