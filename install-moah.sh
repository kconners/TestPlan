#!/usr/bin/env bash

docker stop moah
docker rm moah

docker run --name moah --publish=3355:3306 --ulimit nofile=65536:65536 -e MYSQL_ROOT_PASSWORD=Password1* -d mariadb:10.2

cd database
npm install
npm run build

cd ..
node index.js