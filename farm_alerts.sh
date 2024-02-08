#!/bin/bash
source /home/jason/Documents/FarmOnLinux/functions.sh

URL=$(get_telegram)
IP_ADDRESS=$(get_ipaddress)

CHAT_ID=6919531958

while true; do
    # LOG TELEGRAM ALERT
    LOG_FILE="/script.log"


    LIMITLINES=4
    for i in {1..3}; do
        OUTPUT=$(tail -n $LIMITLINES "$LOG_FILE")
        clear
        echo "Last $LIMITLINES Message:"
        echo "$OUTPUT"
        sleep 1
    done

    # Send the last log message via Telegram
    OUTPUT=$(tail -n 1 "$LOG_FILE")
   
    curl -X POST "$URL" -d "chat_id=$CHAT_ID" -d "text=RIG 8X $OUTPUT" -d "parse_mode=HTML"
    
    # Check if the script has exited with a non-zero status
    #
    # Sleep 
    sleep 10
done

