#!/usr/bin/env bash

set -ex;

IMAGE="mc855"
CURRENT_TAG=$2
MANIFEST=$(aws ecr batch-get-image --repository-name $IMAGE --image-ids imageTag=$CURRENT_TAG --query 'images[].imageManifest' --output text)

if [[ "latest" = "$1" ]]; then
  TAG="latest"
elif [[ "dev" = "$1" ]]; then
  TAG="dev"
else 
  echo "Missing env argument"
  exit 1
fi

echo "Changing tag..."

aws ecr put-image --repository-name "$IMAGE" --image-tag $TAG --image-manifest "$MANIFEST"