#!/bin/bash
source ../functions.sh
# IP ADDRESS 
URL=$(get_telegram)

NODE=$(get_node)


IP_ADDRESS=$(get_ipaddress)
HOST=$(hostname)

CHAT_ID=6919531958

curl -X POST "$URL" -d "chat_id=$CHAT_ID" -d "text=/setIP $IP_ADDRESS $HOST" -d "parse_mode=HTML"

#do NVIDIASMI 
# echo 'starting NVIDIASMI'
#echo $(../gpusmi.sh)

echo 'starting NODE'
#starting node
while true; do
    echo $NODE
    $NODE

    echo "restarting node....."
    sleep 1
done

