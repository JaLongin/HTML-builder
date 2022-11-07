const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const bundle = fs.createWriteStream(path.join(__dirname, "project-dist", 'bundle.css'));
(async function(){
    try{
        const listOfFiles = await fsPromises.readdir(path.join(__dirname, 'styles'));
        let listOfPaths = listOfFiles.map(file => path.join(__dirname,"styles", file));
        listOfPaths = listOfPaths.filter(pathy => path.extname(pathy) == '.css');
        console.log(listOfPaths); 
        listOfPaths.forEach(pathy =>{
            const readStream = fs.createReadStream(pathy);
            readStream.on('data', data => {
                console.log(data);
                bundle.write(data);
            });
        })
    }catch{
    }
})();

