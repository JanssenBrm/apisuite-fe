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
   - component:\tall (Start all environment): sandbox, marketplace, sso and portal

       Or

   Use the command and the exact name of the 'APISuite Module' to start one at a time. Examples

   - $0 start sandbox
   - $0 build portal

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
    #checkIsRunning ${moduleName}
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
    local dockerComposeFile=$1
    shift

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

# function checkIsRunning() {
#     local moduleName=$1
#     shift
#
#     while true; do
#           RUNNING=$(dockerInspect ${moduleName})
#
#           if [ "$RUNNING" == "true" ] ; then
#                echo -e "-- $moduleName is running.\n"
#                break
#           else
#                sleep 1
#           fi
#     done
# }

# --------------------------------------------------------------------------
# Docker inspect image. Check image is running
# --------------------------------------------------------------------------
function dockerInspect() {
    local moduleName=$1
    echo $(docker inspect --format="{{ .State.Running }}" ${moduleName})
}

# --------------------------------------------------------------------------
# Run docker-compose file by module
# --------------------------------------------------------------------------
function run() {
    local modules=("$@")
    for module in "${modules[@]}"; do
        module_name="${module%%=*}"
        module_docker_compose="${module##*=}"

        echo -e "\033[0;36m$(echo ${METHOD} | tr '[a-z]' '[A-Z]') ${module_name} [ ${module_docker_compose} ]\033[0m\n"
        dockerCompose ${module_docker_compose}

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
        run ${MODULES[@]}
    else
        for module in "${MODULES[@]}"; do
            if [ "${module%%=*}" == "${COMPONENT%/}" ]; then
                run ${module}
                break
            fi
        done
    fi
}

# Docker compose for sandbox
#
DOCKER_COMPOSE_SANDBOX=docker-compose-sandbox.yaml
#

# Modules of the APISuite
MODULES=( "sandbox=${DOCKER_COMPOSE_SANDBOX}" )

# ARGS
METHOD=$1
COMPONENT=$2
SCALE=$3
SLEEP=${4:-1} # DEFAULT SLEEP = 1 sec

# Validate arguments
if [ "$METHOD" == "" ] || [ "$COMPONENT" = "" ]; then
    help
fi

# Check prerequesits
checkPrerequisits

# Prepare to run. Example: ./apisuite-env.sh start all
prepareToRun
