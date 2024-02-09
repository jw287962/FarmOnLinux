#!/bin/bash

for CPUFREQ in /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor; do
    echo "performance" | sudo tee $CPUFREQ
done


cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
