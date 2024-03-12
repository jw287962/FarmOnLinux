# FarmOnLinux [(GitHub)](https://github.com/jw287962/FarmOnLinux)
> PLEASE NOTE: I use this with a port monitor that is forked from [ss_log_event_monitor](https://github.com/irbujam/ss_log_event_monitor/tree/main) and edited for my own use now. Due to SystemD auto restarts on my OS

##### FOLLOW OFFICIAL GUIDE & SKIP TO 'SKIP':[Subspace Docs ](https://docs.subspace.network/docs/farming-&-staking/farming/advanced-cli/cli-install/ )
> Although most of my information might be in various links on the docs page.


## Download Latest Release & Guidelines
##### - Subspace Releases [CLICK LINK](https://github.com/subspace/subspace/releases):
sudo apt install jq before running command
- Use UpdateNodeFarm command || wget 'Download URL' to download in CLI 
     
##### -  Executable 'chmod +x /path/to/file': 
##### WGET
**- Node**
- wget -O /home/jason/.local/bin/subspace-node https://github.com/subspace/subspace/releases/download/gemini-3h-2024-feb-15/subspace-node-ubuntu-x86\_64-v2-gemini-3h-2024-feb-15 

**- FARMER**
- wget -O /home/jason/.local/bin/subspace-farmer https://github.com/subspace/subspace/releases/download/gemini-3h-2024-feb-15/subspace-farmer-ubuntu-x86\_64-v2-gemini-3h-2024-feb-15

[Subspace Docs (check Ubuntu for Recommendations) ](https://docs.subspace.network/docs/farming-&-staking/farming/advanced-cli/cli-install/ )
get service information

## FORMAT DRIVES:
- ##### New drives
  - sudo mkfs.ext4 -m 0 -T largefile4 /path/to/dev 
- ##### Farming drives
  - tune2fs -m 0 /dev/sdx  

- Don't forget to take ownership of new drives, and do auto mount at startup
### FIREWALL FOR RPC AND METRICS [PORTS, NETWORK, FIREWALL](https://docs.subspace.network/docs/farming-&-staking/farming/additional-guides/networking)
- sudo ufw allow 30333,30433 comment 'Subspace Node' for the node and sudo ufw allow 30533 comment 'Subspace Farmer'
 - sudo ufw allow port#  || port#/tcp
 - sudo ufw status 
 - sudo ufw delete #  --> delete # based on status ordered list

---
# SKIP HERE:
---
### UPDATE config.json
 - ### USE CORRECT PATHWAY AND NAMES
```
{ 
NODE: "/home/`<NAME>`/.local/bin/subspace-node run --base-path home/`<NAME>`/.local/share/SubspaceNode --chain gemini-3h --farmer --name '`<NAME>`' --rpc-methods unsafe --rpc-cors all --rpc-listen-on 0.0.0.0:9945 --prometheus-listen-on 0.0.0.0:1111",

"RUNNODE": "1",

FARMER: 'home/`<NAME>`/.local/bin/subspace-farmer farm --reward-address `<ADDRESS>` path=`</PATH>`,size=3.93TB -node-rpc-url ws://192.168.1.253:9945 --metrics-endpoints 0.0.0.0:2222',

"CHAT_ID": `<CHATID of telegram>`,

"TIMER": "10"
}
```

   > RUNNODE: 1 or 0
        -  set to 1 will run node incase you use RPC and do not want to run node (Or disable SYSTEMD but this will prevent it from running logic side as well)
   TIMER (MINUTES): 
    - TELEGRAM NOTIFICATION DELAY in MINUTES
           
        	   
# SSH [Subspace Security Doc](https://docs.subspace.network/docs/learn/security)
#### CREATE RSA KEY FOR SSH
 - ssh-keygen |EITHER ONE| ssh-keygen -t rsa -b 2048 
 - ssh-copy-id user@ip //never works for me... idk why I have to manually move it over
#### Move Pub File and Apply permission to SERVER PC
 - cat id_rsa.pub >> ~/.ssh/authorized_keys
- chmod 700 ~/.ssh  
- chmod 600 ~/.ssh/authorized_keys
#### Read log files with 
- tail -n +# of lines file
- IE: tail -n 5 /file

#### SSH CONFIG SETTINGS
###### Edit file with: 
- nano /etc/ssh/sshd_config
###### APPLY CHANGES:
 - ForceCommand /home/jason/Documents/FarmOnLinux/sshLoginAlert.sh
-- This will send alerts when someone SSH into SERVER

APPLY CHANGES TO FILE
- PubkeyAuthentication yes 
- PasswordAuthentication no
-  LoginGraceTime 120
-  PermitRootLogin no 
-  AllowUsers user1 user2

systemctl restart ssh

# OTHER
### DOWNLOADING TOO SLOW?? I THINK? NEVER USED
Add this to your farmer:
--in-connections 500 --pending-in-connections 500 --out-connections 500 --pending-out-connections 500

###  RPC (One Node | Multiple Farm)
### Node:
- rpc-methods unsafe \
- rpc-cors all \
- rpc-listen-on x.x.x.x:9945 
    -- 0.0.0.0:9945 FOR SOME COMPUTERS

### Farmer:

- node-rpc-url ws://x.x.x.x:9945 \
-- Replacing the x.x.x.x with your node's IP address


#### SERVICED
```Make files in ( I THink)
mkdir -p /root/.local/bin
mkdir -p /root/.local/share
```

#### EDITOR for systemd / systemctl service 
- EDITOR=sudo nano -e /etc/systemd/system/subspace-node.service
- EDITOR=sudo nano /etc/systemd/system/subspace-farmer.service
###### AFTER EDIT TO SERVICE FILES:
- systemctl daemon-reload

#### SYSTEMD 
- sudo systemctl start subspace-node 
- sudo systemctl stop subspace-node 
- sudo systemctl enable subspace-node
    - for bootup
- sudo systemctl status subspace-node 

#### View LOGS:
sudo journalctl -f -o cat -u subspace-node
sudo journalctl -f -o cat -u subspace-farmer

#### SAMPLE  SYSTEMCTL/SYSTEMD Service FILE:
[Subspace Docs](https://docs.subspace.network/docs/farming-&-staking/farming/advanced-cli/cli-install/ )
sudo nano /etc/systemd/system/my_custom_service.service
```
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
```
##### SYSTEMD service to run both with 2 services. 

   1. #!/bin/bash
    node /home/jason/Documents/FarmOnLinux/farmStart.js 

   2. #!/bin/bash  [deprecated] - use subspace_monitor to get node status
    node /home/jason/Documents/FarmOnLinux/nodeAndIpStart.js


#### START SCHEDULE W/ CRONTAB on reboot | DO NOT USE FOR SUBSPACE  
- EASIER BUT CRONTAB IS FOR recurring tasks or for set intervals
 -- crontab -e (TO EDIT)
-- crontab -l  (TO VIEW FILE)
- Root
-- sudo crontab -u root -e  (TO EDIT)
-- sudo crontab -u root -l (TO VIEW)
 
##### cpuCorePerf
- to make cpus all performance on startup

#### Temps
 - s-tui
