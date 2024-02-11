const config = require('./config');
const fs = require('fs');
const { exec } = require('child_process');
const LOG_FILE = 'node.log'; 

main();

async function main() {
    console.clear();
    await config.sendTelegramMessage(`IP: ${config.getIpAddress()} \n Starting Node`);
    console.log('starting Node');
    config.ensureDirectoryExistence(LOG_FILE);
    await config.deleteLogFile(LOG_FILE);
    await runNode();
}

async function runNode() {
    try {
        const childProcess = exec(config.NODE);
        let lastMessageSentTime = Date.now();

        childProcess.stdout.on('data', async (data) => {
            fs.appendFileSync(LOG_FILE, data);
            console.log(data);

            if (Date.now() - lastMessageSentTime >= (config.TIMER || 10) * 60 * 1000) {
                lastMessageSentTime = Date.now();
                await config.sendTelegramMessage(data);
            }
        });

        childProcess.stderr.on('data', async (data) => {
            fs.appendFileSync(LOG_FILE, data);
            await config.sendTelegramMessage(`ERROR: ${data}`);
            childProcess.kill();
        });

        await new Promise((resolve) => {
            childProcess.on('exit', async (code, signal) => {
                await config.sendTelegramMessage(`SHUTTING DOWN: ${code}`); 
                resolve();
            });
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

