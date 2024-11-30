#!/bin/bash

# Start the loop
while true
do
    touch node.log
    /home/jason/.local/bin/subspace-node run --chain mainnet --base-path /home/jason/.local/share/SubspaceNode --name 'Jason' --farmer --rpc-methods unsafe --rpc-cors all --rpc-listen-on 0.0.0.0:9944 --prometheus-listen-on 0.0.0.0:1111 >> node.log 2>&1
    echo "don't close this, Running Node"
     # Rename existing log file to backup
    mv /node.log /node.log.backup
    rm node.log
	
    sleep 1  # optional: add a delay before running the command again
done

