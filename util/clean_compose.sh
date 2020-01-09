#!/usr/bin/env bash

set -e

###################################################################
# Script Name : clean_compose.sh
# Description	: Will clean the docker compose file and comment the build line
# Args        : -
# Author      : Délio Amaral (C) 2019 - cloudoki
# Email       : delio@cloudoki.com
###################################################################

# remove if exists or create a docker compose file
rm docker-compose.yml || touch docker-compose.yml

# read and filter the unwanted lines
while IFS= read -r line; do
  # if value of $var starts with #, ignore it
  [[ "$(echo "$line" | tr -d '[:space:]')" =~ ^\#.* ]] && continue

  # if value of $var starts with build, comment it
  if [[ "$(echo "$line" | tr -d '[:space:]')" =~ ^build.* ]]; then
    echo "# $line" >> docker-compose.yml
  else
    echo "$line" >> docker-compose.yml
  fi
done < docker-compose.yaml
