#!/bin/sh

set -e

echo "Waiting for MySQL"

while ! mysqladmin ping -h"$APPCENTER_API_DATABASE_HOST" --silent; do
    sleep 3
done

>&2 echo "MySQL is up"
echo "Executing $@"
exec "$@"
