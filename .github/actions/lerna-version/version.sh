#!/bin/bash

# Require prerelease identifer for pre(patch,minor,major) bumps
if [ "${1:0:3}" = "pre" ]; then
  if [ -z "$2" ]; then
    echo "Error: prerelease identifier is required for prerelease bumps."
    exit 1
  fi
  VERSION_ARGS="$1 --preid $2"
else
  VERSION_ARGS="$1"
fi

# Run lerna version with the specified arguments
# Do not commit or tag as we need to re-format the package files before committing
bun run lerna version $VERSION_ARGS --no-git-tag-version --no-push --yes

# Extract the updated version from lerna.json
VERSION=$(jq -r '.version' lerna.json)
echo "VERSION=$VERSION" >> "$GITHUB_OUTPUT"
