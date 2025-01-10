#!/bin/sh

echo "Starting Waku Nodes"
docker compose -f docker-compose.yml up -d --build

echo "Starting Tests"
docker compose -f docker-compose-tests.yml up --build

echo "Teardown"
docker compose -f docker-compose-tests.yml down
docker compose -f docker-compose.yml down