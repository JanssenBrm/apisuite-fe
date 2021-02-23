#!/usr/bin/env bash

set -e

###################################################################
# Script Name : run_test.sh
# Description	: Will run the projects tests
# Args        : -
# Author      : Délio Amaral (C) 2019 - cloudoki
# Email       : delio@cloudoki.com
###################################################################

cd ..

# Create the base config file
cp "sandbox.config-$CIRCLE_BRANCH.json" "sandbox.config.json"
npm install
npm run test
rm sandbox.config.json
