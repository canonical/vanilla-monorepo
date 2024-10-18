#!/bin/bash

REPO_URL="https://github.com/canonical/vanilla-monorepo"
SUBPACKAGE_PATH="apps/boilerplate-react-vite"
BRANCH="wd-15812-vite-boilerplate"

# Prompt for the project directory name
read -p "Enter your project's name: " PROJECT_NAME

# Check if the input is empty
if [ -z "$PROJECT_NAME" ]; then
  echo "You must provide a project name."
  exit 1
fi

# Check if inside a monorepo (Git context already exists)
if git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  IS_IN_MONOREPO=true
else
  IS_IN_MONOREPO=false
fi

# Initialize a new Git repository and configure sparse-checkout
git init "$PROJECT_NAME"
cd "$PROJECT_NAME" || exit
git remote add -f upstream "$REPO_URL"
git sparse-checkout init --cone

# Set sparse-checkout to include the subpackage directory
git sparse-checkout set "$SUBPACKAGE_PATH"

# Perform a shallow sparse checkout
git fetch upstream "$BRANCH"
git checkout "$BRANCH"

# Delete all files except for the 'apps' directory
shopt -s extglob  # Enable extended globbing
rm -rf !(apps)  # Remove everything except the 'apps' directory

# Move the contents of the subpackage to the current directory
mv "$SUBPACKAGE_PATH/"* .  # Move all files and folders from the subpackage

# Cleanup
git remote remove upstream
rm -rf apps setup.sh 

# If inside a monorepo, there is already a git context; remove the subcontext to avoid git tracking errors
if [ "$IS_IN_MONOREPO" = true ]; then
  rm -rf .git
fi

# Update package.json with the project name and version
PACKAGE_JSON_PATH="./package.json"
if [ -f "$PACKAGE_JSON_PATH" ]; then
  # Update the name and version fields in package.json
  jq --arg name "$PROJECT_NAME" --arg version "0.0.1" '
    .name = $name | 
    del(.private) | 
    .version = $version
  ' "$PACKAGE_JSON_PATH" > tmp.json && mv tmp.json "$PACKAGE_JSON_PATH"
  echo "Updated $PACKAGE_JSON_PATH with name: $PROJECT_NAME and version: 0.0.1"
else
  echo "$PACKAGE_JSON_PATH not found, skipping update."
fi

echo "Cloned $SUBPACKAGE_PATH from branch $BRANCH into $PROJECT_NAME"
