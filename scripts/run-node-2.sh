#!/bin/sh

echo "Waiting for Node 1"
sleep 1

echo "Install curl & jq"
apk add --no-cache curl jq

echo "Getting ENR_URI"
BASE_URL="http://nwaku1:21161"
RESPONSE=$(curl -s -X GET "$BASE_URL/debug/v1/info" -H "Accept: application/json")
ENR_URI=$(echo "$RESPONSE" | jq -r '.enrUri')
echo $ENR_URI

echo "Starting Waku Node 2"
exec /usr/bin/wakunode\
    --listen-address=0.0.0.0\
    --rest=true\
    --rest-admin=true\
    --websocket-support=true\
    --log-level=TRACE\
    --rest-relay-cache-capacity=100\
    --websocket-port=21163\
    --rest-port=21161\
    --tcp-port=21162\
    --discv5-udp-port=21164\
    --rest-address=0.0.0.0\
    --nat=extip:172.18.111.227\
    --peer-exchange=true\
    --discv5-discovery=true\
    --discv5-bootstrap-node=$ENR_URI\
    --relay=true

