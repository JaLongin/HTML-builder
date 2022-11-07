const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ws = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const rl = readline.createInterface(process.stdin, process.stdout);

console.log('print that text!')
rl.on('line', line => {
    if (line == 'exit'){
        rl.close();
        console.log("Thanks for using our service, bye!")
    }
    else
    ws.write(line + '\n');
    rl.on('SIGINT', () => {
        console.log('Bye, good luck!');
        process.exit();
    });
})