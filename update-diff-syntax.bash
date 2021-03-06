#!/bin/bash

VER=$1
if [ "$VER" == "" ]; then
    echo -n "vscode version to use: "
    read VER
fi

URL=https://raw.githubusercontent.com/microsoft/vscode/$VER/extensions/git/syntaxes/diff.tmLanguage.json

curl $URL --output syntaxes/diff.tmLanguage.json
echo $URL > syntaxes/diff.tmLanguage.source
