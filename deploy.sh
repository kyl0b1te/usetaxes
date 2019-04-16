#!/usr/bin/env bash

# Build angular project
docker build -t usetaxes-deployer .

# Deploy static files
docker run --rm -it --env-file .env usetaxes-deployer
