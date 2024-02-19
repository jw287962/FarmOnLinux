## 1) Download Latest Release & Guidelines
##### - Subspace Releases [CLICK LINK](https://github.com/subspace/subspace/releases):
- Use UpdateNodeFarm command || wget 'Download URL' to download in CLI 
     
##### -  Executable 'chmod +x /path/to/file': 
##### WGET

**- Node**
- wget -O /home/jason/.local/bin/subspace-node https://github.com/subspace/subspace/releases/download/gemini-3h-2024-feb-15/subspace-node-ubuntu-x86\_64-v2-gemini-3h-2024-feb-15 

**- FARMER**
- wget -O /home/jason/.local/bin/subspace-farmer https://github.com/subspace/subspace/releases/download/gemini-3h-2024-feb-15/subspace-farmer-ubuntu-x86\_64-v2-gemini-3h-2024-feb-15

---
[Subspace Docs (check Ubuntu for Recommendations) ](https://docs.subspace.network/docs/farming-&-staking/farming/advanced-cli/cli-install/ )
get service information
## 2) VIEW LOGS from systemd/ systemctl start services
    sudo journalctl -f -o cat -u subspace-node
    sudo journalctl -f -o cat -u subspace-farmer


## 3) SSD TEMP
- #### **LIST ALL STORAGE DEVICES**
   -  udisksctl status
        - WILL RETURN /DEV/SDD AND ETC.
- #### CHECK SPACE
    - df 
    - df -h /dev/sdx
     
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

# CPU TEMPS
Nothing works lul on 7950x

