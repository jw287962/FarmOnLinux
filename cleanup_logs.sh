#!/bin/bash

# Move node.log to a dated file
mv /home/jason/Documents/FarmOnLinux/node.log /home/jason/Documents/FarmOnLinux/"$(date +%F)"node.log

# Remove node.log files older than 3 days
rm /home/jason/Documents/FarmOnLinux/"$(date -d "3 days ago" +%F)"node.log

