#!/bin/sh

# for NVIDIA GPU mem
/usr/bin/nvidia-smi -lmc 810;


# for 4090
/usr/bin/nvidia-smi --ID=0 -lgc 2370;

# for 3080s
/usr/bin/nvidia-smi --ID=1,2,3 -lgc 1470;



# RUN ALPH

/home/jasonminer/Downloads/rigel-1.14.2-linux/alph.sh

