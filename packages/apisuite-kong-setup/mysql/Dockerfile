FROM mariadb:latest

COPY sql/. /sql

ENV MYSQL_ROOT_PASSWORD=cloudoki

ADD /sql/. /docker-entrypoint-initdb.d


EXPOSE 3306