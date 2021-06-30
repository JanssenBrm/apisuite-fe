#!/usr/bin/env bash

PROJECT_DIR="~/apisuite-setup"

echo -e "Running: ./update-apisuite-be.sh"
ssh -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST "cd $PROJECT_DIR && ./update-apisuite-fe.sh"
