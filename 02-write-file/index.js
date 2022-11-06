const fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline');
const pathFile = path.join(__dirname, 'letter.txt');

const rl = readline.createInterface({ 
    input : process.stdin,
    output : process.stdout,
});

function fileHandler(){
    fs.open(pathFile, 'w', (err) => {
        if(err) throw err;
        console.log('Привет. Здесь сможешь оставить свое послание в цифровой мир. Далее можно ввести сообщение:');
    });
}
fileHandler()

rl.on('close', () => {
    console.log('Все данные записаны в файл letter.txt. Приятно с тобой иметь дело :)');
    process.exit(0);
});  

rl.on('line', (input) => {
    if (input.toLocaleLowerCase() === 'exit') {
        console.log('Все данные записаны в файл letter.txt. Приятно с тобой иметь дело :)');
        process.exit(0)
    }
    fs.appendFile(pathFile, input  + '\n', (err) => {
        if(err) throw err;
        console.log('Может еще что-нибудь? Ну или если у тебя все, то можешь написать exit или нажать ctrl+C, и мы распрощаемся!');
    });

  });
