const config = require('./config');
const fs = require('fs');
const { exec } = require('child_process');

const LOG_FILE = 'farmers.log';
const FARMER = config.JOURNALCTL;

main();

async function main() {
    console.clear();
    console.log('STARTING FARM');
    await config.sendTelegramMessage('STARTING FARM');

    config.ensureDirectoryExistence(LOG_FILE);
    await config.deleteLogFile(LOG_FILE);
        
    await runFarmer();
    fs.rename(LOG_FILE, farmers.backup.log, (err) => {
        if (err) {
          console.error('Error renaming file:', err);
        } else {
          console.log('File renamed successfully.');
        }
      });
}

async function runFarmer() {
    try {
        const childProcess = exec(FARMER);
        let lastMessageSentTime = Date.now();

        childProcess.stdout.on('data', async (data) => {
             fs.appendFileSync(LOG_FILE, data);
            console.log(data);

            if (Date.now() - lastMessageSentTime >= config.TIMER * 60 * 1000) {
                lastMessageSentTime = Date.now();
                await config.sendTelegramMessage(data);
            }
        });

        childProcess.stderr.on('data', async (data) => {
            fs.appendFileSync(LOG_FILE, data);
             console.log(data);
            await config.sendTelegramMessage(`ERROR: ${data}`);
            childProcess.kill();
        });

        await new Promise((resolve) => {
            childProcess.on('exit', async (code) => {
                await config.sendTelegramMessage(`SHUTTING DOWN ALERTS: ${code}`); 
                resolve();
            });
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

