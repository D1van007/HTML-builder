const { readdir, stat } = require('fs/promises');
const path = require('path');
const pathFolder = path.join(__dirname, 'secret-folder');

const infoOfSecretFiles = async () => {
    try {
        const files = await readdir(pathFolder);

        for ( let i = 0; i < files.length; i += 1) {
        const pathFile = path.join(pathFolder, files[i]);
        const statFile = await stat(pathFile);
        const fileExt = path.extname(pathFile);
        const fileName = path.basename(pathFile, fileExt);
        const fileSize = statFile.size/1000;
            if (statFile.isFile()){
            console.log(`${fileName} - ${fileExt.slice(1)} - ${fileSize}kb`)
            }
        };
      } catch (err) {
        console.error(err);
      }
}
infoOfSecretFiles()