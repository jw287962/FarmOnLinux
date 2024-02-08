# FarmOnLinux
for farming and mining on my linux with telegram notification


Download updated release from subspace and follow updated CLI commands
https://github.com/subspace/subspace/releases 

ADD CHMOD +X to SH SCRIPTS


# 2) UPDATE config.json FOR CORRECT PATHS or updated CLI commands
EXAMPLES:

NODE: '/home/jason/Downloads/subspace-node-ubuntu-x86_64-skylake-gemini-3h-2024-feb-05 run --base-path home/jason/Downloads/SubspaceNode --chain gemini-3h --farmer --name "Jason"'

FARMER: '/home/jason/Downloads/subspace-farmer-ubuntu-x86_64-skylake-gemini-3h-2024-feb-05 farm --reward-address `<ADDRESS>` path=/mnt/ed1bccd4-5d61-43ea-aef6-4d05bd49fdf9,size=3.93TB'

TELEGRAM: https://api.telegram.org/bot `<TOKEN>` /sendMessage


-- START ./startSession.sh  --
# REBOOT START SCRIPT W/ CRONTAB

if you need sudo level permission
sudo crontab -u root -e  (TO EDIT)
sudo crontab -u root -l (TO VIEW)


crontab -e

@reboot /home/pathway to /startSession.sh


crontab -l 

# SSH
attach tmux session by starting attachSession.sh

OPTION 1:
Read log files with 
tail -n `# of lines`
IE: tail -n 5



# DOWNLOADING TOO SLOW?
Add this to your farmer:
--in-connections 500 --pending-in-connections 500 --out-connections 500 --pending-out-connections 500


# One node, multiple farm?

Node:

--rpc-methods unsafe \
--rpc-cors all \
--rpc-listen-on x.x.x.x:9945

Farmer:

--node-rpc-url ws://x.x.x.x:9945 \

Replacing the x.x.x.x with your node's IP address

