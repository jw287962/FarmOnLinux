#!/bin/bash
source functions.sh

#FARM=$(grep 'FARMER:' config.yaml | awk -F "'" '{print $2}')
FARM=$(get_farm)

LOG_FILE="script.log"



while true; do
    # Run the script and redirect its output to the log file]
    $FARM > "$LOG_FILE" 2>&1 


    echo "restarting cli....."
    sleep 1
done


