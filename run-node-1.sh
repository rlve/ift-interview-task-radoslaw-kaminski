#!/bin/sh

echo "Starting Waku Node 1"

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
    --nat=extip:172.18.111.226\
    --peer-exchange=true\
    --discv5-discovery=true\
    --relay=true

