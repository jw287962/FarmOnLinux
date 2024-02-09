#!/bin/bash


# Run $FARM in a new tmux session

# tmux kill-session -t telegram_session 2>/dev/null
./killSession.sh
echo "tmux"

# tmux new-session -d -s telegram_session "../farm_alerts.sh" 

tmux new-session -d -s node_session "node ../startNodeAndIP.js"
sleep 10
tmux new-session -d -s farm_session "node ../start_farm.js" 

#echo $(tmux list-session)

# Wait for the tmux sessions to finish


