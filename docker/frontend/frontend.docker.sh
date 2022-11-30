#!/bin/bash
if [ "$EUID" -ne 0 ]
  then echo "Bitte als root ausführen"
  exit
fi
cp -R ../../SEP-Tipico/src/client .
cd client/
ng build
cd ..
chmod -R 0777 *
docker build -t frontend .
docker save --output="frontend-latest.tar" frontend:latest
chmod 0777 frontend-latest.tar
