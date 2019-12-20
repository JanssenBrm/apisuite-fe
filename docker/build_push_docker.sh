#!/usr/bin/env bash

rm .env
# login into docker hub
echo ${DOCKER_USER_PASS} | docker login --username ${DOCKER_USER_NAME} --password-stdin

# create .env
touch .env

DOCKER_REPO="cloudokihub/apisuite"

# create env vars with the version for each package
APISUITE_CLIENT_MARKETPLACE_VERSION="develop"
APISUITE_CLIENT_PORTAL_VERSION="develop"
APISUITE_CLIENT_SANDBOX_VERSION="develop"
APISUITE_CLIENT_SSO_VERSION="develop"
APISUITE_PLATFORM_VERSION="develop"

if [ "${CIRCLE_BRANCH}" != "develop" ]; then
  APISUITE_CLIENT_MARKETPLACE_VERSION=$(cat ../packages/apisuite-client-marketplace/package.json | grep version | head -1 | awk -F ": " '{ print $2 }' | sed 's/[",]//g')
  APISUITE_CLIENT_PORTAL_VERSION=$(cat ../packages/apisuite-client-portal/package.json | grep version | head -1 | awk -F ": " '{ print $2 }' | sed 's/[",]//g')
  APISUITE_CLIENT_SANDBOX_VERSION=$(cat ../packages/apisuite-client-sandbox/package.json | grep version | head -1 | awk -F ": " '{ print $2 }' | sed 's/[",]//g')
  APISUITE_CLIENT_SSO_VERSION=$(cat ../packages/apisuite-client-sso/package.json | grep version | head -1 | awk -F ": " '{ print $2 }' | sed 's/[",]//g')
  APISUITE_PLATFORM_VERSION=$(cat ../packages/apisuite-platform/package.json | grep version | head -1 | awk -F ": " '{ print $2 }' | sed 's/[",]//g')
fi

# write envs to .env
echo "DOCKER_REPO=${DOCKER_REPO}" >> .env
echo "APISUITE_CLIENT_MARKETPLACE_TAG=client-marketplace-${APISUITE_CLIENT_MARKETPLACE_VERSION}" >> .env
echo "APISUITE_CLIENT_PORTAL_TAG=client-portal-${APISUITE_CLIENT_PORTAL_VERSION}" >> .env
echo "APISUITE_CLIENT_SANDBOX_TAG=client-sandbox-${APISUITE_CLIENT_SANDBOX_VERSION}" >> .env
echo "APISUITE_CLIENT_SSO_TAG=client-sso-${APISUITE_CLIENT_SSO_VERSION}" >> .env
echo "APISUITE_PLATFORM_TAG=platform-${APISUITE_PLATFORM_VERSION}" >> .env

# build and push to docker registry
docker-compose config
# docker-compose build
# docker-compose push