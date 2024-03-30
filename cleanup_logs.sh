#!/bin/bash

log_file="/home/jason/Documents/FarmOnLinux/$(date +%F)node.log"

# Check if the file exists

mv /home/jason/Documents/FarmOnLinux/node.log "$log_file"
echo "Logs moved to: $log_file"


# Remove node.log files older than 3 days
old_log="/home/jason/Documents/FarmOnLinux/$(date -d "3 days ago" +%F)node.log"
if [ -f "$old_log" ]; then
    rm "$old_log"
    echo "Old log file removed: $old_log"
fi

