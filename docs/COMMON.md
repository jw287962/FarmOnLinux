## 1) Download Latest Release & Guidelines
##### - Subspace Releases [CLICK LINK](https://github.com/subspace/subspace/releases):
sudo apt install jq before running command
- Use UpdateNodeFarm command || wget 'Download URL' to download in CLI 
     

##### WGET

**- Node**
- wget -O /home/jason/.local/bin/subspace-node https://github.com/subspace/subspace/releases/download/gemini-3h-2024-feb-15/subspace-node-ubuntu-x86\_64-v2-gemini-3h-2024-feb-15 

**- FARMER**
- wget -O /home/jason/.local/bin/subspace-farmer https://github.com/subspace/subspace/releases/download/gemini-3h-2024-feb-15/subspace-farmer-ubuntu-x86\_64-v2-gemini-3h-2024-feb-15

##CHMOD -  Executable 'chmod +x /path/to/file': 
---
[Subspace Docs (check Ubuntu for Recommendations) ](https://docs.subspace.network/docs/farming-&-staking/farming/advanced-cli/cli-install/ )
get service information
## 2) VIEW LOGS from systemd/ systemctl start services
``` journalctl -o cat -u subspace-farmer --since "$(systemctl show -p ActiveEnterTimestamp --value subspace-farmer)" ```
	
- view logs since script start.

    ``` journalctl -f -o cat -u subspace-node```
    ``` journalctl -f -o cat -u subspace-farmer```
    
     ``` journalctl -u subspace-farmer```
    
    ```journalctl -u service-name.service -b```
       
#### EDITOR for systemd / systemctl service 
- EDITOR= 
     ```sudo nano -e /etc/systemd/system/subspace-node.service```
- EDITOR= 
     ``` sudo nano /etc/systemd/system/subspace-farmer.service ```

	- ```systemctl daemon-reload```
#### Read log files with 
	`tail -n +50 node.log`
	`tail -n +50 -f node.log`
	`tail -f node.log`
	- -f for update
	- IE: 50 represents # of lines to show 

## 3) SSD TEMP
- #### **LIST ALL STORAGE DEVICES**
   -  `udisksctl status`
        - WILL RETURN /DEV/SDD AND ETC.
- #### CHECK SPACE
    - `df `
    - `df -h /dev/sdx`
    
    - `sudo fdisk -l`
     
- #### smartmontools | smartctl
    - Install
    -- sudo apt-get install smartmontools
    - get SMART DATA
    -- sudo smartctl -a /dev/sdd
    -- sudo smartctl -x /dev/sdd | grep Temperature


    # OTHER:
    udisksctl info -b /dev/sda
    udisksctl mount -b /dev/sda1
    udisksctl unmount -b /dev/sdb1
    udisksctl eject -b /dev/sdb
    udisksctl lock -b /dev/sdb1

# CPU TEMPS - corefreq-cli
apply command to where you extract tar file after make and install properly 
sudo insmod ./corefreqk.ko  
``` 
sudo ./corefreqd &
./corefreq-cli
```

# SSH ALERT: (nano ~/.bash_profile)
 - for auto script when some1 ssh 
 - Add "home/jason/.local/bin/sshLoginAlert.sh" or something
