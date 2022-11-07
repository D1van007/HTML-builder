const { readdir, stat } = require('fs/promises');
const path = require('path');
const pathStylesFolder = path.join(__dirname, 'styles');

const bundleStyles = async () => {
    try {
        const styleFiles = await readdir(pathStylesFolder);

        for ( let i = 0; i < styleFiles.length; i += 1) {
        const pathStylesFile = path.join(pathStylesFolder, styleFiles[i]);
        const statStylesFile = await stat(pathStylesFile);
        const StylesFileExt = path.extname(pathStylesFile);
        const StylesFileName = path.basename(pathStylesFile, StylesFileExt);

            if (StylesFileExt === '.css'){
    console.log(StylesFileName)
            }
        };
      } catch (err) {
        console.error(err);
      }
}
bundleStyles()