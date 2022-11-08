const path = require('path');
const fsPromises = require('fs/promises');
const fs = require('fs')
const readdir = fsPromises.readdir;

( async () => {try{
    secretFolderPath = path.join(__dirname, 'secret-folder');
    const files = await readdir(secretFolderPath, {withFileTypes : true});
    console.log(files)
    let listOfFiles = [];
    for (let file of files){
        if (!file.isDirectory())
        listOfFiles.push(file.name);
    }
    let pathsOfFiles = listOfFiles.map(item => path.join(secretFolderPath, item));
    for (let i = 0; i < pathsOfFiles.length; i++){
        fs.stat(pathsOfFiles[i], (err, stats) =>{
            console.log(
                `${listOfFiles[i].substr(0,listOfFiles[i].length - path.extname(pathsOfFiles[i]).length)} ` +
                `- ${path.extname(pathsOfFiles[i]).substr(1,path.extname(pathsOfFiles[i]).length)} - ${(stats.size / 1024).toFixed(2)}kb`
            );
        })
    }
} catch(e){

}})()