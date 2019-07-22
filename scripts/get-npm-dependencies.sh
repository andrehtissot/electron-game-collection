#!/bin/bash

getNPMDependencies() {
    npmList=`npm ls --depth=0 --only=prod`
    local index=-1
    local deps=''
    for line in $npmList; do
        index=$((index+1))
        if [ $index -gt 2 ] && [ $((index % 2)) -eq 1 ]; then
            deps="$deps $line"
        fi
    done
    echo $deps
}