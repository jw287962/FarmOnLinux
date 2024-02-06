# FarmOnLinux
for farming and mining on my linux with telegram notification


# UPDATE CONFIG.YAML FOR CORRECT PATHS
EXAMPLES:

NODE: 'home/jason/Downloads/subspace-node-ubuntu-x86_64-skylake-gemini-3h-2024-feb-05 run --base-path home/jason/Downloads/SubspaceNode --chain gemini-3h --farmer --name "Jason"'

FARMER: 'home/jason/Downloads/subspace-farmer-ubuntu-x86_64-skylake-gemini-3h-2024-feb-05 farm --reward-address <ADDRESS> path=/mnt/ed1bccd4-5d61-43ea-aef6-4d05bd49fdf9,size=3.93TB'

TELEGRAM: https://api.telegram.org/bot<TOKEN>/sendMessage

# REBOOT START SCRIPT W/ CRONTAB
crontab -e

@reboot /home/Downloads/startup/ipbroadcast.sh
@reboot /home/Downloads/restart_subspace_farm.sh


crontab -l to see if it is in it
