const { mkdir,readdir, unlink, writeFile, copyFile, readFile, replace} = require('fs/promises');
const { createReadStream, createWriteStream} = require('fs');
const {resolve} = require('path');
const path = require('path');
const pathStylesFolder = path.join(__dirname, 'styles');
const pathBundleFile = path.join(__dirname, 'project-dist/style.css');
const pathMainFolder = path.join(__dirname, 'project-dist');
const pathOriginHtml = path.join(__dirname, 'template.html');
const pathCopyHtml = path.join(__dirname, 'project-dist/index.html');
const pathAssets = path.join(__dirname, 'assets');
const pathCloneAssets = path.join(__dirname, 'project-dist/assets');
const pathFolderComponents = path.join(__dirname, 'components');








const buildPage = async () =>{
    try {
        const mainFolder = await mkdir(pathMainFolder, { recursive: true });
        const copyHtml = await copyFile (pathOriginHtml, pathCopyHtml);
        const bundleFile = await writeFile(pathBundleFile, '');
        // unlink(pathCopyHtml);
        let rsCopyHtml = await readFile(pathCopyHtml, 'utf-8');
        
        const filesOfComponents = await readdir(pathFolderComponents);
        console.log(filesOfComponents)
        for ( let i = 0; i < filesOfComponents.length; i += 1) {
            const pathFileComponents = path.join(pathFolderComponents, filesOfComponents[i]);

            const fileComponentsExt = path.extname(pathFileComponents);
            const fileComponentsName = path.basename(pathFileComponents, fileComponentsExt);

            const rComponentsHtml = await readFile(pathFileComponents, 'utf-8');

            rsCopyHtml = rsCopyHtml.replace(`{{${fileComponentsName}}}`, rComponentsHtml)

        const writeInBundle = createWriteStream(pathCopyHtml);
        writeInBundle.write(rsCopyHtml)
    }

      } catch (err) {
        console.error(err);
      }

    }


buildPage()




const copyAssets = async () => {
    try {    
        const cloneAssetsFolder = await mkdir(pathCloneAssets, { recursive: true });
        const originAssetsFiles = await readdir(pathAssets);
        const cloneAssetsFiles = await readdir(pathCloneAssets);

            for ( let i = 0; i < cloneAssetsFiles.length; i += 1) {
                const pathCloneFileForDel = path.join(pathCloneAssets, cloneAssetsFiles[i]);
                unlink(pathCloneFileForDel);
            };

            async function getFiles(dir) {
                // читаем содержимое директории
                const dirents = await readdir(dir, { withFileTypes: true });
                // как и в прошлом примере проходимся по папкам
                // и, при необходимости рекурсивно вызываем функцию
                const files = await Promise.all(dirents.map((dirent) => {
                    const res = resolve(dir, dirent.name);
                    return dirent.isDirectory() ? getFiles(res) : res;
                }));
                // преобразуем массив файлов в одномерный
                return Array.prototype.concat(...files);
            }
            // тестируем
            const allInAssets = []
            getFiles(pathAssets).then(files => allInAssets.push(files))



            // for ( let i = 0; i < originAssetsFiles.length; i += 1) {
            //     async function copyFiles() {
            //         // if ()
            //     }
            //         const pathOriginFile = allInAssets[i];
            //         console.log(pathOriginFile)
            //         const pathCloneFile = path.join(cloneAssetsFolder, cloneAssetsFiles[i]);
            //         const copyFileToCloneFolder = await copyFile (pathOriginFile, pathCloneFile);

            // };
            
      } catch (err) {
        console.error(err);
      };
};
copyAssets();




const bundleStyles = async () => {
    try {
        const styleFiles = await readdir(pathStylesFolder);
        const bundleFile = await writeFile(pathBundleFile, '');
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




