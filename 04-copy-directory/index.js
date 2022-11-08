const fsPromises = require('fs/promises');
const path = require('path');

const pathToCopies = path.join(__dirname, "files-copy");
const pathToOriginals = path.join(__dirname, "files");
(async function(){
    try{
    
    fsPromises.mkdir(pathToCopies,{recursive: true});
    const files = await fsPromises.readdir(pathToOriginals);
    const pathsToFiles = files.map(file =>path.join(pathToOriginals, file));
    pathsToFiles.forEach((pathy, index) => {(async function(){
        try{
            await fsPromises.copyFile(pathy, path.join(pathToCopies, files[index]));
            console.log('file was copied successfully')
        }catch{
            console.log('file was not copied')
        }
    })()})
    }catch(e){

    }
})();