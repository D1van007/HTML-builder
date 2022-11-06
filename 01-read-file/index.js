const fs = require('fs');
const path = require('path');
const pathText = path.join(__dirname, 'text.txt');
const stream = new fs.createReadStream(pathText);

stream.on('readable', function(){
    const data = stream.read();
    if(data != null)
    {console.log(data.toString());}
});