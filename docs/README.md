# FarmOnLinux
for farming and mining on my linux with telegram notification


Download updated release from subspace and follow updated CLI commands
https://github.com/subspace/subspace/releases  -- Use UpdateNodeFarm command
wget 'LINK' to download in CLI

ADD CHMOD +X to SH SCRIPTS

## FORMAT DRIVES:
  >sudo mkfs.ext4 -m 0 -T largefile4 /path/to/dev

## TURN ON FIREWALL FOR METRIC ENDPOINTS AND FOR RPC 
 - force allow or may cause abrupt issues
 - sudo ufw allow port#  || port#/tcp
 - sudo ufw status 
 - sudo ufw delete #  --> delete # based on status ordered list

## 2) UPDATE config.json FOR CORRECT PATHS or updated CLI commands
EXAMPLES: 
### CHANGE NAME OF JASON IN NODE AND FARMER TO YOUR USER
{

NODE: "/home/`<NAME>`/.local/bin/subspace-node run --base-path home/`<NAME>`/.local/share/SubspaceNode --chain gemini-3h --farmer --name '`<NAME>`' --rpc-methods unsafe --rpc-cors all --rpc-listen-on 0.0.0.0:9945 --prometheus-listen-on 0.0.0.0:1111",

"RUNNODE": "1",

FARMER: 'home/`<NAME>`/.local/bin/subspace-farmer farm --reward-address `<ADDRESS>` path=`</PATH>`,size=3.93TB -node-rpc-url ws://192.168.1.253:9945 --metrics-endpoints 0.0.0.0:2222',

"CHAT_ID": `<CHATID of telegram>`,

"AUTOSTART": 0,

"TIMER": "10"
}

 ### NOTES
    - RUNNODE set to 1 will run node... else will not run node... for RPC
    - AUTOSTART--> Add 1 for autostart.. 0 will call autoStop to kill all services... relies on SystemD though. so set up systemd first.
    - TIMER: Units in Minutes... TELEGRAM NOTIFICATION DELAY 
           
# SSH
OPTION 1:??

Read log files with 
tail -n `# of lines`
IE: tail -n 5

CREATE RSA KEY FOR SSH
 ssh-keygen |EITHER ONE| ssh-keygen -t rsa -b 2048 
ssh-copy-id user@ip

cat id_rsa.pub >> ~/.ssh/authorized_keys
chmod 700 ~/.ssh  
chmod 600 ~/.ssh/authorized_keys


# to alert telegram
nano /etc/ssh/sshd_config
add:
ForceCommand /home/jason/Documents/FarmOnLinux/sshLoginAlert.sh
& PubkeyAuthentication yes | PasswordAuthentication no | LoginGraceTime 120 | PermitRootLogin no | AllowUsers user1 user2
systemctl restart ssh



# OTHER
## DOWNLOADING TOO SLOW?
Add this to your farmer:
--in-connections 500 --pending-in-connections 500 --out-connections 500 --pending-out-connections 500

## One node, multiple farm?
Node:
--rpc-methods unsafe \
--rpc-cors all \
--rpc-listen-on x.x.x.x:9945  || USE 0.0.0.0:9945 FOR SOME COMPUTERS

Farmer:

--node-rpc-url ws://x.x.x.x:9945 \

Replacing the x.x.x.x with your node's IP address


# SERVICED

```shell-session
mkdir -p /root/.local/bin

mkdir -p /root/.local/share
```
## Node  EDIT JASON USERNAME | EDIT WEBSITE LINK FROM GITHUB
wget -O /home/jason/.local/bin/subspace-node https://github.com/subspace/subspace/releases/download/gemini-3h-2024-feb-15/subspace-node-ubuntu-x86\_64-v2-gemini-3h-2024-feb-15 
## FARMER: 
wget -O /home/jason/.local/bin/subspace-farmer https://github.com/subspace/subspace/releases/download/gemini-3h-2024-feb-15/subspace-farmer-ubuntu-x86\_64-v2-gemini-3h-2024-feb-15

[Subspace Docs (check Ubuntu for Recommendations) ](https://docs.subspace.network/docs/farming-&-staking/farming/advanced-cli/cli-install/ )
get service information

# EDITOR for systemd / systemctl service
EDITOR=nano sudo -e /etc/systemd/system/subspace-node.service
EDITOR=nano sudo -e /etc/systemd/system/subspace-farmer.service

# SYSTEMD 
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



# SAMPLE  SYSTEMCTL/SYSTEMD Service FILE:
[Subspace Docs](https://docs.subspace.network/docs/farming-&-staking/farming/advanced-cli/cli-install/ )
sudo nano /etc/systemd/system/my_custom_service.service

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

# SYSTEMD service to run both with 2 services.

   1. #!/bin/bash
    node /home/jason/Documents/FarmOnLinux/farmStart.js 

   2. #!/bin/bash
    node /home/jason/Documents/FarmOnLinux/nodeAndIpStart.js


## START SCHEDULE W/ CRONTAB on reboot | DO NOT USE FOR SUBSPACE  
- EASIER BUT CRONTAB IS FOR recurring tasks or for set intervals
crontab -e (TO EDIT)
crontab -l  (TO VIEW FILE)

sudo crontab -u root -e  (TO EDIT)
sudo crontab -u root -l (TO VIEW)
 
on cpuCorePerf to make cpus all performance on startup??


