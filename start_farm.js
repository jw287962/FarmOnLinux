const config = require('./config')
const fs = require('fs');
const { exec } = require('child_process');
const axios = require('axios');

const CHAT_ID= 6919531958
const LOG_FILE = './log_file.log';
const FARMER = config.FARMER;


main();

//WORKING 

async function main() {
    while (true) {
        await runFarmer();
        await sendTelegramMessage('RESTARTING CLI');
        console.log('Restarting CLI...');
        await new Promise((resolve) => setTimeout(resolve, 9000)); // Sleep for 9 seconds
    }
}


async function runFarmer() {
    try {
        const childProcess = exec(FARMER);

        childProcess.stdout.on('data', (data) => {
            fs.appendFileSync(LOG_FILE, data.toString());
            console.log(data.toString());
        });

        childProcess.stderr.on('data', (data) => {
            fs.appendFileSync(LOG_FILE, data.toString());
            console.log(data.toString());
        });

        await new Promise((resolve) => {
            childProcess.on('exit', () => {
                resolve();
            });
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

async function sendTelegramMessage(message) {
    try {
        await axios.post(config.TELEGRAM, {
            chat_id: CHAT_ID,
            text: `message`,
            parse_mode: 'HTML'
        });
    } catch (error) {
        console.error('Error:', error);
    }
}