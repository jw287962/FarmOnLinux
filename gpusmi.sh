#!/bin/sh


# for NVIDIA GPU mem
/usr/bin/nvidia-smi -pm 1
/usr/bin/nvidia-smi -lmc 810;
#PERSISTENCE: nvidia-smi -pm 1 for persistence mode

# for 4090
#/usr/bin/nvidia-smi --ID=0 -lgc 2370;

# for 3080s
#/usr/bin/nvidia-smi --ID=1,2,3 -lgc 1470;


/usr/bin/nvidia-smi -lgc 1470;
# RUN ALPH


#tmux new-session -d -s alph_session "/home/jasonminer/Downloads/rigel-1.14.2-linux/alph.sh 2>&1"

#Query mem	nvidia-smi --query-gpu=clocks.mem --format=csv,noheader
#query clock	nvidia-smi --query-gpu=clocks.gr --format=csv,noheader
