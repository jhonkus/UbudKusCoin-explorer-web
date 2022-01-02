#!/bin/bash

mkdir -p ./grpc/services

PROTOC=`command -v protoc`
if [[ "$PROTOC" == "" ]]; then
  echo "Required "protoc" to be installed. Please visit https://github.com/protocolbuffers/protobuf/releases (3.5.0 suggested)."
  exit -1
fi


echo "Compiling protobuf definitions"
protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  -I ./grpc/protos \
  --js_out=import_style=commonjs,binary:./grpc/services \
  --ts_out=service=grpc-web:./grpc/services \
  ./grpc/protos/bchain.proto