#!/bin/bash

## POLYFILL
source $(dirname $0)/realpath.polyfill.sh

## UTILS
source $(dirname $0)/get-npm-dependencies.sh
EXTRA_DEPENDENCIES=""

## PATHS
SCRIPTS_DIR=$(dirname $(realpath $0))
ROOT_DIR=$(realpath "$SCRIPTS_DIR/..")
DIST_DIR="$ROOT_DIR/dist"
PLUGINS_DIR="$DIST_DIR/plugins"
#### SERVER
SERVER_PROJECT_DIR=$(realpath "$ROOT_DIR/../electron-game-collection-server")
SERVER_PROJECT_DIST_DIR="$SERVER_PROJECT_DIR/dist"
SERVER_DIR="$DIST_DIR/server"
#### STEAM PLUGIN
STEAM_PLUGIN_PROJECT_DIR=$(realpath "$ROOT_DIR/../electron-game-collection-steam-plugin")
STEAM_PLUGIN_PROJECT_DIST_DIR="$STEAM_PLUGIN_PROJECT_DIR/dist"
STEAM_PLUGIN_DIR="$PLUGINS_DIR/steam"

## FRONTEND
cd $ROOT_DIR
rm -rf $DIST_DIR
npx webpack --mode production --progress --colors
cp $ROOT_DIR/main.js $DIST_DIR/main.js
cp $ROOT_DIR/package.json $DIST_DIR/package.json
npm install --only=prod
mkdir $PLUGINS_DIR

## SERVER
cd $SERVER_PROJECT_DIR
npm install
npm run build
EXTRA_DEPENDENCIES=$(getNPMDependencies)
cp -r $SERVER_PROJECT_DIST_DIR $SERVER_DIR

## PLUGINS
#### STEAM
cd $STEAM_PLUGIN_PROJECT_DIR
npm install
npm run build-release
EXTRA_DEPENDENCIES="$EXTRA_DEPENDENCIES $(getNPMDependencies)"
cp -r $STEAM_PLUGIN_PROJECT_DIST_DIR $STEAM_PLUGIN_DIR

## PACKING
cd $DIST_DIR
npm install --save $EXTRA_DEPENDENCIES
cd $ROOT_DIR
electron-builder --dir # for current OS unpacked
# electron-builder --linux --dir # linux unpacked
# electron-builder --linux tar.gz --x64 # linux tgz 64 bits
# electron-builder --mac --dir # mac unpacked
# electron-builder --mac zip # mac dmg
# # electron-builder --windows --dir # windows unpacked
# electron-builder --windows zip --x64 # windows zip 64 bits
# electron-builder --windows zip --ia32 # windows zip 32 bits