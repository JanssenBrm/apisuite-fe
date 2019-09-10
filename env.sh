#!/usr/bin/env bash

# +----------------------------------+
# | Author: Erick Rettozi            |
# |                                  |
# | (C) 2019 - cloudoki              |
# |                                  |
# | Script to manager the modules    |
# +----------------------------------+

# Docker compose for sandbox
DOCKER_COMPOSE_SANDBOX=docker-compose-sandbox.yaml

function help() {
    echo -e "
Tool to manage the local APISuite environment

Usage: $0 [cmd] [method] [sleep (wait for each request) ]

   - cmd:\tstart, stop, pull, restart, build, up-build or kill
   - method:\tall (Start all environment): sandbox, marketplace, sso and portal

       Or

   Use the command and the exact name of the 'APISuite Module' to start one at a time. Examples

   - $0 start sandbox
   - $0 build portal

   - sleep: Optional parameter. The time must be in seconds
"
    exit 0
}

function initialize() {
    [ ! -f ${DOCKER_COMPOSE_SANDBOX} ] && echo "The file '${DOCKER_COMPOSE_SANDBOX}' not found!" && exit 0
}

function dockerCompose() {
    local cmd=$1
    local dockerComposeFile=$2
    shift

    if [ "$cmd" == "start" ]; then
        docker-compose -f ${dockerComposeFile} up -d --force-recreate --remove-orphans
        #checkIsRunning ${moduleName}
    elif [ "$cmd" == "stop" ]; then
        docker-compose -f ${dockerComposeFile} down
    elif [ "$cmd" == "pull" ]; then
        docker-compose -f ${dockerComposeFile} pull
    elif [ "$cmd" == "restart" ]; then
        docker-compose -f ${dockerComposeFile} down
        docker-compose -f ${dockerComposeFile} up -d
    elif [ "$cmd" == "build" ]; then
        docker-compose -f ${dockerComposeFile} build
    elif [ "$cmd" == "up-build" ]; then
        docker-compose -f ${dockerComposeFile} up --build
        #
        # TODO: Refactor
        #checkIsRunning ${moduleName}
    #
    # TODO: Refactor
    #elif [ "$cmd" == "kill" ]; then
    #    docker kill ${moduleName}
    else
        echo "* Command '${cmd}' is not supported! *"
        exit 0
    fi
}

# TODO: Refactor
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

function dockerInspect() {
    local moduleName=$1
    echo $(docker inspect --format="{{ .State.Running }}" ${moduleName})
}

function run() {
    local cmd=$1
    shift
    local modules=("$@")
    for module in "${modules[@]}"; do
        module_name="${module%%=*}"
        module_docker_compose="${module##*=}"

        echo "${cmd} ${module_name} - [${module_docker_compose}]"
        # Run docker-compose
        dockerCompose ${cmd} ${module_docker_compose}

        if [ "${cmd}" == "start" ] || [ "${cmd}" == "restart" ]; then
           sleep $SLEEP
        fi
    done
}

function prepareToRun() {
    local method=$1
    local cmd=$2
    shift

    if [ "$method" == "all" ]; then
        run ${cmd} ${MODULES[@]}
    else
        for module in "${MODULES[@]}"; do
            if [ "${module%%=*}" == "${method%/}" ]; then
                run ${cmd} ${module}
                break
            fi
        done
    fi
}

MODULES=( "sandbox=${DOCKER_COMPOSE_SANDBOX}" )

# ARGS
CMD=$1
METHOD=$2
SLEEP=${3:-32} # DEFAULT SLEEP = 32 sec

# Validate arguments
if [ "$CMD" == "" ] || [ "$METHOD" = "" ]; then
    help
fi

# Create bucket and network
initialize

# Run command and method. Example: ./env.sh start all
prepareToRun ${METHOD} ${CMD}
