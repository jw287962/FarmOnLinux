#!/bin/bash
source functions.sh
URL=$(get_telegram)
IP_ADDRESS=$(get_ipaddress)

CHAT_ID=6919531958

FARM=$(get_farm)

LOG_FILE="script.log"



while true; do
    # Run the script and redirect its output to the log file]
    $FARM > "$LOG_FILE" 2>&1 

    curl -X POST "$URL" -d "chat_id=$CHAT_ID" -d "text=RESTARTING CLI" -d "parse_mode=HTML"
    echo "restarting cli....."
    sleep 5
done


