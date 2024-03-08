#!/bin/bash

while true
do
    /home/jason/.local/bin/subspace-node run --base-path /home/jason/.local/share/SubspaceNode --chain gemini-3h --farmer --name 'Jason' --rpc-methods unsafe --rpc-cors all --rpc-listen-on 0.0.0.0:9945 --prometheus-listen-on 0.0.0.0:1111 >> /path/to/node.log 2>&1
    sleep 1  # optional: add a delay before running the command again
done

