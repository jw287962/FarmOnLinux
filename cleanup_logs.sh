#!/bin/bash

log_file="/home/jason/Documents/FarmOnLinux/$(date +%F)node.log"

# Check if the file exists
if [ ! -f "$log_file" ]; then
    touch "$log_file"
    echo "Log file created: $log_file"
else
    echo "Log file already exists: $log_file"
fi

# Remove node.log files older than 3 days
old_log="/home/jason/Documents/FarmOnLinux/$(date -d "3 days ago" +%F)node.log"
if [ -f "$old_log" ]; then
    rm "$old_log"
    echo "Old log file removed: $old_log"
fi

