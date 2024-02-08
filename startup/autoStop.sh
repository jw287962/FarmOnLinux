#!/bin/bash

# Set variables
#FARM=$(grep 'FARMER:' config.yaml | awk -F "'" '{print $2}')
#LOG_FILE="script.log"

CONFIG="../config.json"

# Run $FARM in a new tmux session

# tmux kill-session -t telegram_session 2>/dev/null

AUTOSTART_VALUE=$(grep -o '"AUTOSTART": [0-9]*' "$CONFIG" | cut -d' ' -f2)
sleep 10

# tmux new-session -d -s telegram_session "../farm_alerts.sh" 
if [ "$AUTOSTART_VALUE" -eq 0 ]; then
    echo "AUTO STOP"
    ./killSession.sh
fi
#echo $(tmux list-session)

# Wait for the tmux sessions to finish


