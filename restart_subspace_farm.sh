#!/bin/bash

# Set variables
#FARM=$(grep 'FARMER:' config.yaml | awk -F "'" '{print $2}')
#LOG_FILE="script.log"



# Run $FARM in a new tmux session

tmux kill-session -t telegram_session 2>/dev/null
tmux kill-session -t farm_session 2>/dev/null


tmux new-session -d -s telegram_session "./farm_alerts.sh" 
tmux new-session -d -s farm_session "./start_farm.sh" 

#echo $(tmux list-session)

# Wait for the tmux sessions to finish


