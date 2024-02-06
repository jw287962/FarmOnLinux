# FarmOnLinux
for farming and mining on my linux with telegram notification


Download updated release from subspace and follow updated CLI commands
https://github.com/subspace/subspace/releases 

!!chmod +X ./startup/ipbroadcast.sh !!
!!chmod +X restart_subspace_farm.sh !!


START ipbroadcast/sh first
START restart_subspace_farm.sh

IPBROADCAST STARTS Subspace Node and broadcast computer IP to ssh if needed
restart_subspace_farm.sh will restart FARM and telegram alerts for FARMING

# UPDATE CONFIG.YAML FOR CORRECT PATHS or updated CLI commands
EXAMPLES:

NODE: '/home/jason/Downloads/subspace-node-ubuntu-x86_64-skylake-gemini-3h-2024-feb-05 run --base-path home/jason/Downloads/SubspaceNode --chain gemini-3h --farmer --name "Jason"'

FARMER: '/home/jason/Downloads/subspace-farmer-ubuntu-x86_64-skylake-gemini-3h-2024-feb-05 farm --reward-address `<ADDRESS>` path=/mnt/ed1bccd4-5d61-43ea-aef6-4d05bd49fdf9,size=3.93TB'

TELEGRAM: https://api.telegram.org/bot `<TOKEN>` /sendMessage

# REBOOT START SCRIPT W/ CRONTAB

if you need sudo level permission
sudo crontab -u root -e  (TO EDIT)
sudo crontab -u root -l (TO VIEW)


crontab -e

@reboot /home/Downloads/startup/ipbroadcast.sh
@reboot /home/Downloads/restart_subspace_farm.sh

crontab -l 




