

const config = require('../config')
const fs = require('fs');
const { exec } = require('child_process');


main();
async function main(){



    while (true) {
        console.clear();
        await config.sendTelegramMessage(`IP: ${config.getIpAddress()}\n Host: ${config.HOSTNAME}`)

        await runNode();
        await config.sleep(10000); // 10 seconds delay
    }

}


async function runNode() {
    try {
        const childProcess = exec(config.NODE);
        const LOG_FILE = 'node.log'; 
        let lastMessageSentTime = Date.now();
        config.ensureDirectoryExistence(LOG_FILE)

        childProcess.stdout.on('data', async (data) => {
            fs.appendFileSync(LOG_FILE, data);
            console.log(data);
            
            if (Date.now() - lastMessageSentTime >= 5 * 60 * 1000) {
                // Send message to Telegram
                await config.sendTelegramMessage(data);
                
                // Update the last message sent time
                lastMessageSentTime = Date.now();
            }
        });
       

        childProcess.stderr.on('data', async (data) => {
            fs.appendFileSync(LOG_FILE, data);
            console.log(data);
           
            await config.sendTelegramMessage(data);
        });

        await new Promise((resolve) => {
            childProcess.on('exit', () => {
                resolve();
            });
        });
    } catch (error) {
        console.error('Error:', error);
        // config.sendTelegramMessage('Farmer ${error}') 
    }
}