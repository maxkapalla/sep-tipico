#!/bin/bash
if [ "$EUID" -ne 0 ]
  then echo "Bitte als root ausführen"
  exit
fi
chmod 0777 sep-tipico-0.0.1-SNAPSHOT.jar
docker build -t backend .
docker save --output="backend-latest.tar" --change 'CMD ["java","-jar","/usr/app/sep-tipico-0.0.1-SNAPSHOT.jar"]' backend:latest
chmod 0777 backend-latest.tar
