const { mkdir,  readdir, unlink, copyFile} = require('fs/promises');
const path = require('path');
const pathOriginFolder = path.join(__dirname, 'files')
const pathCloneFolder = path.join(__dirname, 'files-copy')


const copyFolders = async () => {
    try {    
        const cloneFolder = await mkdir(pathCloneFolder, { recursive: true });
        const originFiles = await readdir(pathOriginFolder);
        const cloneFiles = await readdir(pathCloneFolder);

            for ( let i = 0; i < cloneFiles.length; i += 1) {
                const pathCloneFileForDel = path.join(pathCloneFolder, cloneFiles[i]);
                unlink(pathCloneFileForDel);
            };

            for ( let i = 0; i < originFiles.length; i += 1) {
                    const pathOriginFile = path.join(pathOriginFolder, originFiles[i]);
                    const pathCloneFile = path.join(pathCloneFolder, originFiles[i]);
                    const copyFileToCloneFolder = await copyFile (pathOriginFile, pathCloneFile);
            };
            
      } catch (err) {
        console.error(err);
      };
};
copyFolders();