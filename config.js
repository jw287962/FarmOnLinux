const fs = require('fs');
const path = require('path');
const config = require("./config.json");
const os = require('os');

const axios = require('axios');

// Load and parse the JSON configuration file
// const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
// Access the values directly from the config object
// console.log('NODE:', config.NODE);
// console.log('FARMER:', config.FARMER);
// console.log('TELEGRAM:', config.TELEGRAM);

const HOSTNAME = os.hostname()

async function sendTelegramMessage(message) {
    try {
        await axios.post(config.TELEGRAM, {
            chat_id: config.CHAT_ID,
            text: `${HOSTNAME}\n:${message}`,
            parse_mode: 'HTML'
        });
    } catch (error) {
        console.error('Error:', error);
    }
}


function getIpAddress() {
    const interfaces = os.networkInterfaces();
    for (let iface in interfaces) {
        for (let addr of interfaces[iface]) {
            if (!addr.internal && addr.family === 'IPv4') {
                return addr.address;
            }
        }
    }
    return null; // Return null if IP address not found
}
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const ensureDirectoryExistence = (filePath) => {
    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
    giveReadWritePermission(filePath)
};

const giveReadWritePermission =(filePath) => {
    
    fs.access(filePath, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, (err) => {
        try {
            fs.accessSync(filePath, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
        } catch (err) {
            // File doesn't exist or doesn't have read/write permissions
            fs.chmodSync(filePath, '600'); // Set permissions to read/write for owner only
            console.log(`Changed permissions of ${filePath} to read/write`);
        }
    });
}

async function deleteLogFile(logFilePath) {
    try {
        await fs.promises.writeFile(logFilePath, ''); // Clear the contents of the log file
        console.log(`Log file ${logFilePath} cleared successfully.`);
    } catch (error) {
        // Handle error if file clearing fails
        console.error('Error clearing log file:', error);
    }
}
config.sendTelegramMessage = sendTelegramMessage;
config.HOSTNAME = HOSTNAME;
config.getIpAddress = getIpAddress;
config.sleep = sleep;
config.deleteLogFile = deleteLogFile;
config.ensureDirectoryExistence = ensureDirectoryExistence;

module.exports = config;