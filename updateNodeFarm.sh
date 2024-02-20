#!/bin/bash
# You can edit the $Name == to a different version possibly. although idk if bash is on other OS by default.
# Fetch the latest release data
contents=$(curl -s https://api.github.com/repos/subspace/subspace/releases/latest)

# Extract asset information
assets=$(echo "$contents" | jq -r '.assets[] | "\(.name) \(.browser_download_url)"')

HOME=~/

# Loop through each asset
while read -r name download_url; do
	
    echo "-----"
    # DOWNLOAD NODE
     if [[ $name == *"subspace-node-ubuntu-x86_64-skylake-gemini-3h"* ]]; then
	node_path="$HOME.local/bin/subspace-node"
        wget -O $node_path $download_url
        echo "-------"
        echo "Downloaded NODE (UBUNTU ONLY): $download_url "
        echo "-------"
   	chmod +x $node_path
    else
       echo "skip"
    fi
      # DOWNLOAD FARMER
    if [[ $name == *"subspace-farmer-ubuntu-x86_64-skylake-gemini-3h"* ]]; then
    	farmer_path="$HOME.local/bin/subspace-farmer"
        wget -O $farmer_path $download_url
	echo "-------"	
        echo "Downloaded FARMER (UBUNTU ONLY): $download_url "
        echo "-------"
  	chmod +x $farmer_path
    else
        echo "skip"
    fi
    
    echo "-----"
done <<< "$assets"

