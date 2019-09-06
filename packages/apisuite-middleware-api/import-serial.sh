#!/bin/bash

# FUNCTIONS
help() {
	echo -e "   Usage of the script:"
	echo -e "      ./`basename $0` IP PORT USERNAME PASSWORD CERTIFICATE LB-SERVICE"
	echo -e "  		IP            IP address of the WAF endpoint       (default: 172.20.237.41, acceptance WAF)"
	echo -e "  		PORT          Port number of the WAF endpoint      (default: 8000)"
	echo -e "  		USERNAME      Username of API user"
	echo -e "  		PASSWORD      Password of API user"
	echo -e "  		CERTIFICATE   Absolute path to the certificate"
	echo -e "  		LB-SERVICE    Load balancer service name           (default: LB_TLS-MA_whitelist)"
}

outputHandler() {
	GOOD_VAR=$1
	BAD_VAR=$2

	if [[ "${BAD_VAR}" != "null" ]]; then
		echo "!! Oops... Something went wrong."
		echo "   > $(echo ${BAD_VAR} | jq -r '.type')"
		echo "   > $(echo ${BAD_VAR} | jq -r '.msg')"
		logoutSession
	else
		echo "+ $(echo ${GOOD_VAR} | jq -r '.msg')"
	fi

}

logoutSession() {
	REQUEST_TOKEN_DELETE=`curl -X DELETE http://${ARG_IP}:${ARG_PORT}/restapi/v3/logout -H 'Accept: application/json' -H 'Content-Type: application/json' -u "${TOKEN}:" 2>/dev/null`
	REQUEST_TOKEN_DELETE_ERROR=`echo ${REQUEST_TOKEN_DELETE} | jq '.errors'`
	# Handle output by viewing the good output and error output in a different way
	outputHandler "${REQUEST_TOKEN_DELETE}" "${REQUEST_TOKEN_DELETE_ERROR}"

	exit;
}

# VARIABLES
ARG_IP="${1:-172.20.237.41}"
ARG_PORT="${2:-8000}"
ARG_USERNAME="${3}"
ARG_PASSWORD="${4}"
ARG_CERTIFICATE="${5}"
ARG_LB_SERVICE="${6:-LB_TLS-MA_whitelist}"

# CHECKS
## Check if all arguments are filled in
if [ "$#" -lt 6 ]; then
	echo "!! No all parameters were given. Exiting..."
	help
	exit 1;
fi

## Check if WAF endpoint is reachable
if ! nc -z ${ARG_IP} ${ARG_PORT} 2> /dev/null; then
	echo "!! Unable to connect to the given endpoint (IP: ${ARG_IP}, Port: ${ARG_PORT}). Exiting..."
	exit 1;
fi

## Check if certificate exists
if [ ! -f "${ARG_CERTIFICATE}" ]; then
	echo "!! The certificate does not exist. Exiting..."
	exit 1;
fi

## Check if certificate has a serial
if ! openssl x509 -in "${ARG_CERTIFICATE}" -noout -serial &> /dev/null; then
	echo "!! The certificate does not have a valid serial or cannot be parsed. Exiting..."
	exit 1;
fi

# SCRIPTS
## Get the login token
REQUEST_TOKEN=`curl -X POST "http://${ARG_IP}:${ARG_PORT}/restapi/v3/login" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"password\": \"${ARG_PASSWORD}\", \"username\": \"${ARG_USERNAME}\" }" 2>/dev/null`
REQUEST_ERROR=`echo ${REQUEST_TOKEN} | jq '.errors'`

if [[ "${REQUEST_ERROR}" != "null" ]]; then
	echo "!! Oops... Something went wrong."
	echo "   > $(echo ${REQUEST_ERROR} | jq -r '.type')"
	echo "   > $(echo ${REQUEST_ERROR} | jq -r '.msg')"
	exit 1;
else
	echo "+ Logged in."
fi

TOKEN=`echo ${REQUEST_TOKEN} | jq '.token'`

## Get the existing allow/deny clients entries
REQUEST_GET_ALLOW_DENY_CLIENTS=`curl -X GET "http://${ARG_IP}:${ARG_PORT}/restapi/v3/services/${ARG_LB_SERVICE}/allow-deny-clients" -H 'Accept: application/json' -H 'Content-Type: application/json' -u "${TOKEN}:" 2>/dev/null`
REQUEST_GET_ALLOW_DENY_CLIENTS_ERROR=`echo ${REQUEST_GET_ALLOW_DENY_CLIENTS}`
if [[ "${REQUEST_GET_ALLOW_DENY_CLIENTS_ERROR}" == *"does not exist on this system"* ]]; then
	echo "!! Oops... Something went wrong."
	echo "   > $(echo ${REQUEST_GET_ALLOW_DENY_CLIENTS_ERROR} | jq -r '.msg')"

	logoutSession
fi

## Filter out only the serials
REQUEST_GET_EXISTING_SERIALS=`echo ${REQUEST_GET_ALLOW_DENY_CLIENTS} | jq '.data[] | .["certificate-serial"]' | grep -v "*" | awk '{gsub(/"/, "", $0); print toupper($0)}'`

## Parse the serial number from the certificate
CERTIFICATE_SERIAL=`openssl x509 -in "${ARG_CERTIFICATE}" -noout -serial | sed 's/serial=//g' | fold -w2 | paste -sd':' - | awk '{print toupper($0)}'`
# remark: openssl "-subject" puts surrounding spaces on the different parts of the subject => 'CN = '
CERTIFICATE_CN=`openssl x509 -in "${ARG_CERTIFICATE}" -noout -subject | awk -F'CN = ' '{print $2}' | sed "s/\*\./wildcard\./g"`

## Check if certificate serial exists on WAF
if [[ "${REQUEST_GET_EXISTING_SERIALS}" =~ "${CERTIFICATE_SERIAL}" ]]; then
	echo "!! The certificate serial ${CERTIFICATE_SERIAL} exists already on the selected WAF endpoint. Exiting..."
	exit 1;
fi

## Get the last sequence number from the rules
LAST_SEQUENCE_NUMBER=`echo ${REQUEST_GET_ALLOW_DENY_CLIENTS} | jq '.data[].sequence' | sed "s/\"//g" | grep -v 10000 | sort -n | tail -n 1`
NEW_SEQUENCE_NUMBER=`echo $((LAST_SEQUENCE_NUMBER + 1))`

## Insert the new rule for the new serial on the WAF
echo "+ Inserting client certificate allow rule"
REQUEST_INSERT_RULE=`curl -X POST "http://${ARG_IP}:${ARG_PORT}/restapi/v3/services/${ARG_LB_SERVICE}/allow-deny-clients" -H "Accept: application/json" -H "Content-Type: application/json" -d "{\"country\": \"*\", \"sequence\": \"${NEW_SEQUENCE_NUMBER}\", \"status\": \"On\", \"name\": \"${CERTIFICATE_CN}\", \"locality\": \"*\", \"state\": \"*\", \"common-name\": \"*\", \"action\": \"Allow\", \"organizational-unit\": \"*\", \"organization\": \"*\", \"certificate-serial\": \"${CERTIFICATE_SERIAL}\"}" -u "${TOKEN}:" 2>/dev/null`
REQUEST_INSERT_RULE_ERROR=`echo ${REQUEST_INSERT_RULE} | jq '.error'`
# Handle output by viewing the good output and error output in a different way
outputHandler "${REQUEST_INSERT_RULE}" "${REQUEST_INSERT_RULE_ERROR}"

## Logout the token
logoutSession
