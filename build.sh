#!/usr/bin/env bash

. ./generate_envfile.sh

echo ${DOCKER_PASS} | docker login --username ${DOCKER_USER} --password-stdin

HASH=$(git rev-parse --short HEAD)
VERSION=$(cat package.json | grep version | head -1 | awk -F ": " '{ print $2 }' | sed 's/[",]//g')

docker build --build-arg SSH_PRIVATE_KEY="$(echo $GITHUB_SSH_PRIVATE_KEY_BASE64 | base64 -d)" \
  -t cloudokihub/apisuite-fe:latest \
  -t cloudokihub/apisuite-fe:$VERSION .
docker push cloudokihub/apisuite-fe:latest
docker push cloudokihub/apisuite-fe:$VERSION

