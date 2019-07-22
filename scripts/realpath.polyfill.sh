#!/bin/bash

if ! [ -x "$(command -v realpath)" ]; then
    realpath() {
        OURPWD=$PWD
        cd "$(dirname "$1")"
        LINK=$(readlink "$(basename "$1")")
        while [ "$LINK" ]; do
            cd "$(dirname "$LINK")"
            LINK=$(readlink "$(basename "$1")")
        done
        BASENAME=$(basename "$1")
        REALPATH="$PWD/$BASENAME"
        if [ $BASENAME == ".." ] || [ $BASENAME == "//.." ]; then
            REALPATH=$(dirname $(dirname "$REALPATH"))
        fi
        cd "$OURPWD"
        echo "$REALPATH"
    }
fi