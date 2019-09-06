FROM node:8.12.0-alpine

WORKDIR /openbank-tester

RUN apk update
RUN apk add --no-cache make gcc g++ python

COPY . .

RUN yarn

EXPOSE 3000

USER 1000

CMD yarn start


#RUN apt-get update && apt-get -y install cron

# Add crontab file in the cron directory
#ADD crontab /etc/cron.d/hello-cron

# Give execution rights on the cron job
#RUN chmod 0644 /etc/cron.d/hello-cron

# Apply cron job
#RUN crontab /etc/cron.d/hello-cron

# Create the log file to be able to run tail
#RUN touch /var/log/cron.log

# Run the command on container startup
#CMD cron && tail -f /var/log/cron.log
