

const config = require('./config')
const fs = require('fs');
const { exec } = require('child_process');
const LOG_FILE = 'node.log'; 
 const BACKUP_FILE = 'node.log.backup';
let errorString = "";
main();

function renameLogFile() {
 
    try {
        fs.renameSync(LOG_FILE, BACKUP_FILE);
        console.log('Log file renamed to', BACKUP_FILE);
    } catch (error) {
        console.error('Error renaming log file:', error);
    }
}
async function main(){
    
    while (config.RUNNODE == 1 && !errorString.includes("Database file is in use.")) {
        console.clear();
        await config.sendTelegramMessage(`IP: ${config.getIpAddress()} \n Starting Node`)
        console.log('starting Node');
        config.ensureDirectoryExistence(LOG_FILE)
        await config.deleteLogFile(LOG_FILE);
        await runNode();
        await config.sleep(10000); // 10 seconds delay
    }

}


async function runNode() {
    try {
        
        const childProcess = exec(config.NODE);
        
        let lastMessageSentTime = Date.now();

        // config.ensureDirectoryExistence(LOG_FILE)

        childProcess.stdout.on('data', async (data) => {
            fs.appendFileSync(LOG_FILE, data);
            
            if (Date.now() - lastMessageSentTime >= (config.TIMER || 10) * 60 * 1000) {
                // Send message to Telegram
                lastMessageSentTime = Date.now();
                await config.sendTelegramMessage(data);
                
            }
        });
       

        childProcess.stderr.on('data', async (data) => {
            fs.appendFileSync(LOG_FILE, data);
            await config.sendTelegramMessage(`ERROR: ${data}`);
		errorString = data
		
                childProcess.kill()
                
        });

        await new Promise( (resolve) => {
            childProcess.on('exit', async (code,signal) => {
                await config.sendTelegramMessage(`SHUTTING DOWN NODE: ${code}`); 
                //    if (code !== 0) {
		renameLogFile();
                resolve();
            });
        });
    } catch (error) {
        console.error('Error:', error);
        // config.sendTelegramMessage('Farmer ${error}') 
    }
}
