#!/bin/bash

# Open first terminal and attach to tmux session
gnome-terminal -- tmux attach-session -t farm_session &

# Open second terminal and attach to tmux session
gnome-terminal -- tmux attach-session -t node_session &

