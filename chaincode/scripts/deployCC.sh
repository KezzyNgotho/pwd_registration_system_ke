#!/bin/bash

CHANNEL_NAME="pwdchannel"
CC_NAME="pwd-contract"
CC_SRC_PATH="pwd"
CC_RUNTIME_LANGUAGE="typescript"
CC_VERSION="1.0"
CC_SEQUENCE="1"

echo "Packaging chaincode..."
peer lifecycle chaincode package ${CC_NAME}.tar.gz \
    --path ${CC_SRC_PATH} \
    --lang ${CC_RUNTIME_LANGUAGE} \
    --label ${CC_NAME}_${CC_VERSION}

echo "Installing chaincode..."
peer lifecycle chaincode install ${CC_NAME}.tar.gz
# Add 'node' to the list of supported languages
SUPPORTED_LANGUAGES=("go" "java" "javascript" "typescript" "node")

