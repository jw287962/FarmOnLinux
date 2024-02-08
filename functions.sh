

# functions.sh
CONFIG_FILE="./config.yaml"
# Function to extract TELEGRAM URL from config file
get_telegram() {
    awk '/TELEGRAM:/ {print $2}' "$CONFIG_FILE"
}


get_ipaddress() {
    ip -o -4 addr show | awk '{print $4}' | cut -d'/' -f1
}

get_node(){
    awk -F "'" '/NODE:/ {print $2}' "$CONFIG_FILE"
}

get_farm(){
    awk -F "'" '/FARMER:/ {print $2}' "$CONFIG_FILE"
}


# You can define more functions here as needed

