#!/bin/bash

docker network create -d bridge aerotravel


docker build -f ./frontend/Dockerfile -t goluballa/frontend .


docker compose up -d frontend 


docker build -f ./back/Dockerfile -t goluballa/backend .


docker compose up -d backend


