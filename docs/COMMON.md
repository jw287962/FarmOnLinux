
# VIEW LOGS from systemd/ systemctl start services
    sudo journalctl -f -o cat -u subspace-node
    sudo journalctl -f -o cat -u subspace-farmer

# END VIEW LOGS

# SSD TEMP
    ## smartmontools | smartctl

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

