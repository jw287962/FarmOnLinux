

const config = require('./config')
const fs = require('fs');
const { exec } = require('child_process');


main();
async function main(){

    while (true) {
        console.clear();
        await config.sendTelegramMessage(`IP: ${config.getIpAddress()} \n Starting Node`)
        console.log('starting Node');

        await deleteLogFile(LOG_FILE);
        await runNode();
        await config.sleep(10000); // 10 seconds delay
    }

}


async function runNode() {
    try {
        const childProcess = exec(config.NODE);
        const LOG_FILE = 'node.log'; 
        let errorCount = 0;
        let lastMessageSentTime = Date.now();

        config.ensureDirectoryExistence(LOG_FILE)

        childProcess.stdout.on('data', async (data) => {
            fs.appendFileSync(LOG_FILE, data);
            console.log(data);
            
            if (Date.now() - lastMessageSentTime >= (config.TIMER || 10) * 60 * 1000) {
                // Send message to Telegram
                lastMessageSentTime = Date.now();
                await config.sendTelegramMessage(data);
                
                // Update the last message sent time
                
            }
        });
       

        childProcess.stderr.on('data', async (data) => {
            fs.appendFileSync(LOG_FILE, data);
            console.log(data);
            await config.sendTelegramMessage(`ERROR: ${data}`);

            errorCount++;
            if (errorCount >=3){
                childProcess.kill()
                
            }
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