const { readdir, unlink} = require('fs/promises');
const { createReadStream, createWriteStream} = require('fs');
const path = require('path');
const pathStylesFolder = path.join(__dirname, 'styles');
const pathBundleFile = path.join(__dirname, 'project-dist/bundle.css');

const bundleStyles = async () => {
    try {
        const styleFiles = await readdir(pathStylesFolder);
        unlink(pathBundleFile);
        for ( let i = 0; i < styleFiles.length; i += 1) {
        const pathStylesFile = path.join(pathStylesFolder, styleFiles[i]);
        const StylesFileExt = path.extname(pathStylesFile);

        const inStyle = createReadStream(pathStylesFile, 'utf-8');
        const writeInBundle = createWriteStream(pathBundleFile, {flags: 'a+'});
 
                if (StylesFileExt === '.css')  {
                    inStyle.pipe(writeInBundle);
                }
        };
      } catch (err) {
        console.error(err);
      }
}
bundleStyles();