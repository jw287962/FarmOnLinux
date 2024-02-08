#!/bin/bash

# Open first terminal and attach to tmux session
gnome-terminal -- tmux attach-session -t session_name_1 &

# Open second terminal and attach to tmux session
gnome-terminal -- tmux attach-session -t session_name_2 &

