#!/bin/bash -xe
TAG=`date "+%Y-%m-%d"T%H-%M-%S`
echo $CR_PAT | docker login ghcr.io -u ericksaito --password-stdin
docker build -f Dockerfile -t ghcr.io/ericksaito/mc855:${TAG} .
docker tag ghcr.io/ericksaito/mc855:${TAG} ghcr.io/ericksaito/mc855:dev
docker push ghcr.io/ericksaito/mc855:${TAG}
docker push ghcr.io/ericksaito/mc855:dev
