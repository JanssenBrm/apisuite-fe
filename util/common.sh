#!/usr/bin/env bash

set -e

###################################################################
# Script Name : common.sh
# Description	: Has common code that is used by multiple scripts
# Args        : -
# Author      : Délio Amaral (C) 2019 - cloudoki
# Email       : delio@cloudoki.com
###################################################################

# Set the root directory of projects folder
ROOT_PROJECTS_FOLDER=${ROOT_PROJECTS_FOLDER:-"packages"}

# Set the list of projects
PROJECTS_LIST=$(ls -d ../${ROOT_PROJECTS_FOLDER}/*/ | cut -f3 -d/)

# Identify modified directories
## Get latest succesful build/commit
LAST_SUCCESSFUL_BUILD_URL="https://circleci.com/api/v1.1/project/github/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/tree/$CIRCLE_BRANCH?filter=completed&limit=10&shallow=true"
LAST_SUCCESSFUL_COMMIT=`curl -Ss -u "$CIRCLE_TOKEN:" $LAST_SUCCESSFUL_BUILD_URL | jq -r 'map(select (.workflows.job_name | startswith("deploy"))) | sort_by(.author_date|split("Z")[0]|split(".")[0]+"Z"|fromdate)|[last][0]["vcs_revision"]'`

## First commit in a branch
if [[ ${LAST_SUCCESSFUL_COMMIT} == "null" ]]; then
  COMMITS="origin/${CIRCLE_BRANCH}"
elif [[ $CIRCLE_SHA1 == $LAST_SUCCESSFUL_COMMIT ]]; then
  COMMITS="origin/${CIRCLE_BRANCH}"
else
  COMMITS="${CIRCLE_SHA1}..${LAST_SUCCESSFUL_COMMIT}"
fi
# Filter result and only list the project folders that where updated
PROJECTS=$(git diff --name-only $COMMITS | grep "${ROOT_PROJECTS_FOLDER}" | cut -d/ -f2 | sort -u)
echo -e "\nCOMMITS=$COMMITS\n"
echo -e "Modified directories:\n`echo ${PROJECTS}`\n"

# Convert the project list to an array
PROJECTS_AS_ARRAY=($(echo ${PROJECTS_LIST}))

# Export var to be used in other scripts
export ROOT_PROJECTS_FOLDER
export PROJECTS_LIST
export PROJECTS
export PROJECTS_AS_ARRAY
