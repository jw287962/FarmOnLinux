#!/bin/bash
source functions.sh
URL=$(get_telegram)
IP_ADDRESS=$(get_ipaddress)

CHAT_ID=6919531958

while true; do
    # LOG TELEGRAM ALERT
    LOG_FILE="script.log"
    # Get the last log message
    OUTPUT=$(tail -n 1 "$LOG_FILE")

    # Send the last log message via Telegram
    curl -X POST "$URL" -d "chat_id=$CHAT_ID" -d "text=$OUTPUT" -d "parse_mode=HTML"

    # Check if the script has exited with a non-zero status
    #
    # Sleep for 5 minutes
    sleep 500
done

