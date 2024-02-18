
## Node  EDIT JASON USERNAME | EDIT WEBSITE LINK FROM GITHUB
wget -O /home/jason/.local/bin/subspace-node https://github.com/subspace/subspace/releases/download/gemini-3h-2024-feb-15/subspace-node-ubuntu-x86\_64-v2-gemini-3h-2024-feb-15 
## FARMER: 
wget -O /home/jasonminer/.local/bin/subspace-farmer https://github.com/subspace/subspace/releases/download/gemini-3h-2024-feb-15/subspace-farmer-ubuntu-x86\_64-v2-gemini-3h-2024-feb-15

https://docs.subspace.network/docs/farming-&-staking/farming/advanced-cli/cli-install/ 
get service information

# VIEW LOGS from systemd/ systemctl start services
    sudo journalctl -f -o cat -u subspace-node
    sudo journalctl -f -o cat -u subspace-farmer

# END VIEW LOGS

# SSD TEMP
    ## install smartmontools | smartctl

    sudo apt-get install smartmontools

    ## get all smart data 
    sudo smartctl -a /dev/sdd
    sudo smartctl -x /dev/sdd | grep Temperature

    ## LIST ALL STORAGE DEVICES
    udisksctl status
     - WILL RETURN /DEV/SDD AND ETC.

    # OTHER:
    udisksctl info -b /dev/sda
    udisksctl mount -b /dev/sda1
    udisksctl unmount -b /dev/sdb1
    udisksctl eject -b /dev/sdb
    udisksctl lock -b /dev/sdb1

# END SSD TEMP

# CPU TEMPS

