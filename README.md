# FarmOnLinux
for farming and mining on my linux with telegram notification


Download updated release from subspace and follow updated CLI commands
https://github.com/subspace/subspace/releases 

ADD CHMOD +X to SH SCRIPTS



## 2) UPDATE config.json FOR CORRECT PATHS or updated CLI commands
EXAMPLES:
{
NODE: '`</PATH>`/Downloads/subspace-node-ubuntu-x86_64-skylake-gemini-3h-2024-feb-05 run --base-path home/jason/Downloads/SubspaceNode --chain gemini-3h --farmer --name "Jason"',

FARMER: '`</PATH>`/Downloads/subspace-farmer-ubuntu-x86_64-skylake-gemini-3h-2024-feb-05 farm --reward-address `<ADDRESS>` path=`</PATH>`,size=3.93TB',

"CHAT_ID": `<CHATID of telegram>`,

"AUTOSTART": 0,

"TIMER": "10"
}

 ### NOTES
    - AUTOSTART--> Add 1 for autostart.. 0 will call autoStop to kill all services
    - TIMER: Units in Minutes... TELEGRAM NOTIFICATION DELAY

## START
-- START ./startSession.sh  --

The program should auto restart Node & Farm irrespetive of each other if the program outputs an error 3 times.


## START SCRIPT W/ CRONTAB on reboot
crontab -e (TO EDIT)

@reboot /home/pathway to /startSession.sh
@reboot /home/pathway to /autoStop.sh 

crontab -l  (TO VIEW FILE)


if you need sudo level permission
sudo crontab -u root -e  (TO EDIT)
sudo crontab -u root -l (TO VIEW)

# SSH
attach tmux session by calling attachSession.sh

OPTION 1:
Read log files with 
tail -n `# of lines`
IE: tail -n 5




# OTHER
## DOWNLOADING TOO SLOW?
Add this to your farmer:
--in-connections 500 --pending-in-connections 500 --out-connections 500 --pending-out-connections 500


## One node, multiple farm?

Node:

--rpc-methods unsafe \
--rpc-cors all \
--rpc-listen-on x.x.x.x:9945

Farmer:

--node-rpc-url ws://x.x.x.x:9945 \

Replacing the x.x.x.x with your node's IP address

