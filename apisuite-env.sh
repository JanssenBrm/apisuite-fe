#!/usr/bin/env bash

# +----------------------------------+
# | Author: Erick Rettozi            |
# |                                  |
# | (C) 2019 - cloudoki              |
# |                                  |
# | Script to manager the modules    |
# +----------------------------------+

# --------------------------------------------------------------------------
# Print help
# --------------------------------------------------------------------------
function help() {
    echo -e "\033[0;36m
Tool to manage the local APISuite environment

Usage: $0 [method] [component] [scale] [sleep (wait for each request) ]

   - method:\tstart, stop, pull, restart, build and up-build
   - component:\tall (Start all environment): sandbox, marketplace, sso, portal and Kong

       Or

   Use the command and the exact name of the 'APISuite Module' to start one at a time. Examples

   - $0 start sandbox
   - $0 build portal
   - $0 start kong

   Optional parameters

   - scale: Number of container for a service
   - sleep: The time must be in seconds
\033[0m"
    exit 0
}

# --------------------------------------------------------------------------
# Check prerequisits
# --------------------------------------------------------------------------
function checkPrerequisits() {
    [ ! -f ${DOCKER_COMPOSE_SANDBOX} ] && echo "The file '${DOCKER_COMPOSE_SANDBOX}' not found!" && exit 0
    #
    # Add here the others compose files
}

# --------------------------------------------------------------------------
# Start docker image
# --------------------------------------------------------------------------
function startImage() {
    docker-compose -f ${dockerComposeFile} up -d --force-recreate --remove-orphans
}

# --------------------------------------------------------------------------
# Stop docker image
# --------------------------------------------------------------------------
function stopImage() {
    docker-compose -f ${dockerComposeFile} down
}

# --------------------------------------------------------------------------
# Restart docker image
# --------------------------------------------------------------------------
function restartImage() {
    stopImage && sleep 1 && startImage
}

# --------------------------------------------------------------------------
# Pull docker image
# --------------------------------------------------------------------------
function pullImage() {
    docker-compose -f ${dockerComposeFile} pull
}

# --------------------------------------------------------------------------
# Build docker image
# --------------------------------------------------------------------------
function buildImage() {
    docker-compose -f ${dockerComposeFile} build
}

# --------------------------------------------------------------------------
# Build and Up docker image
# --------------------------------------------------------------------------
function upBuildImage() {
    docker-compose -f ${dockerComposeFile} up --build
}

# --------------------------------------------------------------------------
# Scale docker image
# --------------------------------------------------------------------------
function scaleImage() {
    echo "docker-compose -f ${dockerComposeFile} up -d --scale ${SCALE}"
    docker-compose -f ${dockerComposeFile} up --scale ${SCALE} -d
}

# --------------------------------------------------------------------------
# Run docker-compose
# --------------------------------------------------------------------------
function dockerCompose() {
    dockerComposeFile=$1

    case ${METHOD} in
        start)
            startImage
        ;;
        stop)
            stopImage
        ;;
        pull)
            pullImage
        ;;
        restart)
            restartImage
        ;;
        build)
            buildImage
        ;;
        up-build)
            upBuildImage
        ;;
        *)
             echo "* Method '${METHOD}' is not supported! *"
             exit 0
        ;;
    esac
}

# --------------------------------------------------------------------------
# Run docker-compose file by component
# --------------------------------------------------------------------------
function run() {
    local components=("$@")
    for component in "${components[@]}"; do
        component_name="${component%%=*}"
        component_docker_compose="${component##*=}"

        echo -e "\033[0;36m$(echo ${METHOD} | tr '[a-z]' '[A-Z]') ${component_name} [ ${component_docker_compose} ]\033[0m\n"

        if [ ${component_name} == "kong" ]; then
            cd packages/apisuite-kong-setup
            dockerCompose ${component_docker_compose}
            cd ../../
        else
            dockerCompose ${component_docker_compose}
        fi

        if [ "${METHOD}" == "start" ] || [ "${METHOD}" == "restart" ]; then
           sleep $SLEEP
        fi
    done
}

# --------------------------------------------------------------------------
# Check what modules will be start
# --------------------------------------------------------------------------
function prepareToRun() {
    if [ "$COMPONENT" == "all" ]; then
        run ${COMPONENTS[@]}
    else
        for component in "${COMPONENTS[@]}"; do
            if [ "${component%%=*}" == "${COMPONENT%/}" ]; then
                run ${component}
                break
            fi
        done
    fi
}

# --------------------------------------------------------------------------
# Validate arguments
# --------------------------------------------------------------------------
function validArgs() {
    if [ "$METHOD" == "" ] || [ "$COMPONENT" = "" ]; then
        help
    fi
}

# Docker compose of the components
DOCKER_COMPOSE_SANDBOX=docker-compose-sandbox.yaml
DOCKER_COMPOSE_KONG=docker-compose-kong.yaml

# Modules of the APISuite
COMPONENTS=( "sandbox=${DOCKER_COMPOSE_SANDBOX}" "kong=${DOCKER_COMPOSE_KONG}" )

# ARGS
METHOD=$1
COMPONENT=$2
SCALE=$3
SLEEP=${4:-1} # DEFAULT SLEEP = 1 sec

# Validate arguments
validArgs

# Check prerequesits
checkPrerequisits

# Prepare to run. Example: ./apisuite-env.sh start all
prepareToRun
