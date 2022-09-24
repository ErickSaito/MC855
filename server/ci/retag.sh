#!/usr/bin/env bash

set -ex;

CURRENT_TAG=$2
echo $CR_PAT | docker login ghcr.io -u ericksaito --password-stdin

if [[ "prod" = "$1" ]]; then
  TAG="latest"
elif [[ "homolog" = "$1" ]]; then
  TAG="dev"
else 
  echo "Missing env argument"
  exit 1
fi

echo "Changing tag..."

docker tag ghcr.io/ericksaito/mc855:${CURRENT_TAG} ghcr.io/ericksaito/mc855:${TAG}
docker push ghcr.io/ericksaito/mc855:${TAG}
