#!/usr/bin/env bash

PROJECT_DIR="/apps/apisuite-fe"

scp -o StrictHostKeyChecking=no ./docker-compose.yaml $SSH_USER@$SSH_HOST:$PROJECT_DIR
ssh -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST "cd $PROJECT_DIR && docker-compose --env-file .env pull && docker-compose --env-file .env up -d"
