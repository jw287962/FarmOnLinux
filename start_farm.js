const config = require('./config')
const fs = require('fs');

const { exec } = require('child_process');
const { send } = require('process');



const LOG_FILE = 'farmers.log';
const FARMER = config.FARMER;


main();

//WORKING 

async function main() {
    // await  config.sleep(1000); 
    while (true) {
        console.clear();    
        console.log('STARTING FARM')
        await config.sendTelegramMessage('STARTING FARM ');
        config.ensureDirectoryExistence(LOG_FILE)
        await config.deleteLogFile(LOG_FILE);
        
        await runFarmer();
        await config.sleep(2000);  // Sleep for 1 sec
    }
}


// RUN FARMER AND DOES ALERTS!
async function runFarmer() {
    try {
        const childProcess = exec(FARMER);
        let lastMessageSentTime = Date.now();

       

        childProcess.stdout.on('data', async (data) => {
            fs.appendFileSync(LOG_FILE, data);
            console.log(data);

            if (Date.now() - lastMessageSentTime >= config.TIMER * 60 * 1000) {
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

                childProcess.kill()
        });

        await new Promise((resolve) => {
            childProcess.on('exit', async () => {
                await config.sendTelegramMessage(`SHUTTING DOWN: ${code}`); 
                //    if (code !== 0) {
                    
                resolve();
            });
        });
    } catch (error) {
        console.error('Error:', error);
        // config.sendTelegramMessage('Farmer ${error}') 
    }
}

// async function sendTelegramMessage(message) {
//     try {
//         await axios.post(config.TELEGRAM, {
//             chat_id: CHAT_ID,
//             text: message,
//             parse_mode: 'HTML'
//         });
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }
