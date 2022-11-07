const { mkdir, readdir, unlink, writeFile, copyFile, readFile, stat, replace } = require('fs/promises');
const { createReadStream, createWriteStream } = require('fs');
const { resolve } = require('path');
const fs = require('fs');
const path = require('path');
const pathStylesFolder = path.join(__dirname, 'styles');
const pathBundleFile = path.join(__dirname, 'project-dist/style.css');
const pathMainFolder = path.join(__dirname, 'project-dist');
const pathOriginHtml = path.join(__dirname, 'template.html');
const pathCopyHtml = path.join(__dirname, 'project-dist/index.html');
const pathAssets = path.join(__dirname, 'assets');
const pathCloneAssets = path.join(__dirname, 'project-dist/assets');
const pathFolderComponents = path.join(__dirname, 'components');








const buildPage = async () => {
    try {
        const mainFolder = await mkdir(pathMainFolder, { recursive: true });
        const copyHtml = await copyFile(pathOriginHtml, pathCopyHtml);
        const bundleFile = await writeFile(pathBundleFile, '');
        // unlink(pathCopyHtml);
        let rsCopyHtml = await readFile(pathCopyHtml, 'utf-8');

        const filesOfComponents = await readdir(pathFolderComponents);
        console.log(filesOfComponents)
        for (let i = 0; i < filesOfComponents.length; i += 1) {
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

    // function deleteFolder(path) {
    //     let files = [];
    //     if( fs.existsSync(path) ) {
    //         files = fs.readdirSync(path);
    //         files.forEach(function(file,index){
    //             let curPath = path + "/" + file;
    //             if(fs.statSync(curPath).isDirectory()) {
    //                 deleteFolder(curPath);
    //             } else {
    //                 fs.unlinkSync(curPath);
    //             }
    //         });
    //         fs.rmdirSync(path);
    //     }
    // }
    //     deleteFolder(pathCloneAssets);

        async function deleteFolder(){
            try{
              await fs.promises.access(pathCloneAssets)
              await fs.promises.rm(pathCloneAssets,{recursive: true})
            }catch{
          
            }
          }
          deleteFolder()

    async function copyAssets(){
        const folders = await fs.promises.readdir(pathAssets,{withFileTypes: true});
        for (const folder of folders){
        if(folder.isDirectory()){
            //console.log(${distAssets}/${folder.name})
            await fs.promises.mkdir(`${pathCloneAssets}/${folder.name}`, { recursive: true })
            const files = await fs.promises.readdir(`${pathAssets}/${folder.name}`,{withFileTypes: true});
            for (const file of files){
            if(file.isFile()){
                await fs.promises.copyFile(`${pathAssets}/${folder.name}/${file.name}`,`${pathCloneAssets}/${folder.name}/${file.name}`)
            }
            }
        }
        }
    }
    copyAssets()
    }
    catch (err) {
        console.error(err);
    }
    }
    copyAssets();


const bundleStyles = async () => {
    try {
        const styleFiles = await readdir(pathStylesFolder);
        const bundleFile = await writeFile(pathBundleFile, '');
        unlink(pathBundleFile);
        for (let i = 0; i < styleFiles.length; i += 1) {
            const pathStylesFile = path.join(pathStylesFolder, styleFiles[i]);
            const StylesFileExt = path.extname(pathStylesFile);

            const inStyle = createReadStream(pathStylesFile, 'utf-8');
            const writeInBundle = createWriteStream(pathBundleFile, { flags: 'a+' });

            if (StylesFileExt === '.css') {
                inStyle.pipe(writeInBundle);
            }
        };
    } catch (err) {
        console.error(err);
    }
}
bundleStyles();




