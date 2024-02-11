# FarmOnLinux
for farming and mining on my linux with telegram notification


Download updated release from subspace and follow updated CLI commands
https://github.com/subspace/subspace/releases 
wget 'LINK' to download in CLI

ADD CHMOD +X to SH SCRIPTS



## 2) UPDATE config.json FOR CORRECT PATHS or updated CLI commands
EXAMPLES: 
### CHANGE NAME OF JASON IN NODE AND FARMER TO YOUR USER
{
NODE: '/home/jason/.local/bin/subspace-node run --base-path home/jason/Downloads/SubspaceNode --chain gemini-3h --farmer --name "Jason"',

"RUNNODE": "1",

FARMER: 'home/jason/.local/bin/subspace-node farm --reward-address `<ADDRESS>` path=`</PATH>`,size=3.93TB',

"CHAT_ID": `<CHATID of telegram>`,

"AUTOSTART": 0,

"TIMER": "10"
}

 ### NOTES
    - RUNNODE set to 1 will run node... else will not run node... for RPC
    - AUTOSTART--> Add 1 for autostart.. 0 will call autoStop to kill all services
    - TIMER: Units in Minutes... TELEGRAM NOTIFICATION DELAY 
           
# SSH
OPTION 1:??

Read log files with 
tail -n `# of lines`
IE: tail -n 5

CREATE RSA KEY FOR SSH
ssh-keygen -t rsa -b 2048
ssh-copy-id user@ip

cat id_rsa.pub >> ~/.ssh/authorized_keys
chmod 700 ~/.ssh  
chmod 600 ~/.ssh/authorized_keys


# to alert telegram
nano /etc/ssh/sshd_config
add:
ForceCommand /home/jason/Documents/FarmOnLinux/sshLoginAlert.sh



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


# SERVICED

```shell-session
mkdir -p /root/.local/bin

mkdir -p /root/.local/share
```
## Node  EDIT JASON USERNAME | EDIT WEBSITE LINK FROM GITHUB
wget -O /home/jason/.local/bin/subspace-node https://github.com/subspace/subspace/releases/download/gemini-3h-2024-feb-05/subspace-node-ubuntu-x86\_64-skylake-gemini-3h-2024-feb-05
## FARMER: 
wget -O /home/jason/.local/bin/subspace-farmer https://github.com/subspace/subspace/releases/download/gemini-3h-2024-feb-05/subspace-farmer-ubuntu-x86\_64-skylake-gemini-3h-2024-feb-05

https://docs.subspace.network/docs/farming-&-staking/farming/advanced-cli/cli-install/ 
get service information

# EDITOR
EDITOR=nano sudo -e /etc/systemd/system/subspace-node.service
EDITOR=nano sudo -e /etc/systemd/system/subspace-farmer.service

sudo systemctl start subspace-node 
sudo systemctl stop subspace-node 
sudo systemctl enable subspace-node 
enable  : for bootup
disable : for boootup
sudo systemctl status subspace-node 

systemctl daemon-reload


# View LOGS:
sudo journalctl -f -o cat -u subspace-node
sudo journalctl -f -o cat -u subspace-farmer

## Count Farmer Rewards Received in the Last Hour:

sudo journalctl -o cat -u subspace-farmer --since="1 hour ago" | grep -i "Successfully signed reward hash" | wc -l


# Upgrade
To upgrade a node and farmer, first, stop running services:

 - sudo systemctl stop subspace-{node,farmer}

After using the commands from the beginning of the manual, download the executable files of the new release. And if you installed under a regular user, you will need to switch to that user beforehand.

Now you can start the services:

 - sudo systemctl start subspace-{node,farmer}


# SAMPLE 
[Unit]
Description=Subspace Node
Wants=network.target
After=network.target

[Service]
User=jason
Group=jason
ExecStart=/home/jason/.local/bin/node.sh

KillSignal=SIGINT
Restart=always
RestartSec=10
Nice=-5
LimitNOFILE=100000

[Install]
WantedBy=multi-user.target

# SYSTEMD

#!/bin/bash
node /home/jason/Documents/FarmOnLinux/farmStart.js 

#!/bin/bash
node /home/jason/Documents/FarmOnLinux/nodeAndIpStart.js


## START SCHEDULE W/ CRONTAB on reboot | DO NOT USE FOR SUBSPACE
crontab -e (TO EDIT)
crontab -l  (TO VIEW FILE)

sudo crontab -u root -e  (TO EDIT)
sudo crontab -u root -l (TO VIEW)
 
on cpuCorePerf to make cpus all performance on startup??


