const { readdir } = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const pathToCopies = path.join(__dirname, "files-copy");
const pathToOriginals = path.join(__dirname, "files");
(async function(){
    try{
    const files = await fsPromises.readdir(pathToOriginals);
    const pathsToFiles = files.map(file =>path.join(pathToOriginals, file));
    console.log(pathsToFiles)
    fsPromises.mkdir(pathToCopies,{recursive: true});
    pathsToFiles.forEach((pathy, index) => {(async function(){
        try{
            console.log(pathy, path.join(pathToCopies, files[index]))
            await fsPromises.copyFile(pathy, path.join(pathToCopies, files[index]));
            console.log('file was copied successfully')
        }catch{
            console.log('file was not copied')
        }
    })()})
    }catch(e){

    }
})();
console.log(pathToCopies);
