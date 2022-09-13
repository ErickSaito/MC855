#!/bin/bash -xe
TAG=`date "+%Y-%m-%d"T%H-%M-%S`
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 110779980942.dkr.ecr.us-east-1.amazonaws.com
docker build -f Dockerfile -t 110779980942.dkr.ecr.us-east-1.amazonaws.com/mc855:${TAG} .
docker tag 110779980942.dkr.ecr.us-east-1.amazonaws.com/mc855:${TAG} 110779980942.dkr.ecr.us-east-1.amazonaws.com/mc855:dev
docker push 110779980942.dkr.ecr.us-east-1.amazonaws.com/mc855:${TAG}
docker push 110779980942.dkr.ecr.us-east-1.amazonaws.com/mc855:dev