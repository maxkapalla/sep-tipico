#!/bin/bash
if [ "$EUID" -ne 0 ]
  then echo "Bitte als root ausführen"
  exit
fi

docker image rm -f backend
docker image rm -f frontend
docker load -i frontend-latest.tar 
docker load -i backend-latest.tar

