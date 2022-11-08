const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');

const pathToDist = path.join(__dirname, 'project-dist');


(async function(){
    try{
        const pathToNewAssets = path.join(pathToDist, 'assets');
        const pathToAssets = path.join(__dirname, 'assets');
        fsPromises.mkdir(pathToDist, {recursive: true});
        fsPromises.mkdir(pathToNewAssets, {recursive: true});
        const assets = await fsPromises.readdir(pathToAssets, {withFileTypes: true});
        for(let i = 0; i < assets.length; i++){
            if(assets[i].isDirectory()){
                let localPath = path.join(pathToAssets, assets[i].name);
                fsPromises.mkdir(path.join(pathToNewAssets, assets[i].name), {recursive: true});
                console.log('donny');
                let localFiles = await fsPromises.readdir(localPath)
                console.log(assets[i].name, localFiles.length)
                for(j = 0; j < localFiles.length; j++){
                    try{
                        if (i == 0 && j == 0)
                        console.log(path.join(localPath, localFiles[j]),
                        path.join(pathToNewAssets, assets[i].name, localFiles[j]));
                        await fsPromises.copyFile(path.join(localPath, localFiles[j]),
                         path.join(pathToNewAssets, assets[i].name, localFiles[j]));
                    }catch(e){
                        try{
                            await fsPromises.copyFile(path.join(localPath, localFiles[j]),
                         path.join(pathToNewAssets, assets[i].name, localFiles[j]));
                        }catch{
                            console.log('blyah')
                        }
                    }
                }
            }
            else{
                await fsPromises.copyFile(path.join(pathToAssets, assets[i].name), path.join(pathToNewAssets, assets[i].name))
            }
        }


    }catch(e){
        
    }
})();



(async function(){
    try{
        const bundle = fs.createWriteStream(path.join(__dirname, "project-dist", 'style.css'));
        const listOfFiles = await fsPromises.readdir(path.join(__dirname, 'styles'));
        let listOfPaths = listOfFiles.map(file => path.join(__dirname,"styles", file));
        listOfPaths = listOfPaths.filter(pathy => path.extname(pathy) == '.css');
        listOfPaths.forEach(pathy =>{
            const readStream = fs.createReadStream(pathy);
            readStream.on('data', data => {
                bundle.write(data);
            });
        })
    }catch{
    }
})();





(async function(){
    try{
        const indexHtml = fs.createWriteStream(path.join(__dirname, "project-dist", 'index.html'));
        const templateStream = fs.createReadStream(path.join(__dirname, 'template.html'));
        const components = await fsPromises.readdir(path.join(__dirname, 'components'),);
        let htmlText ='';
        templateStream.on('data', data =>{
            htmlText = data.toString();
        })
        for (let i = 0; i < components.length; i++){
            const stream = fs.createReadStream(path.join(__dirname,'components', components[i]));
            stream.on('data', data =>{
               htmlText =  htmlText.replace(`{{${path.basename(components[i], '.html')}}}`, data.toString());
               if (i == components.length-1)
               indexHtml.write(htmlText);
            })
        }
        console.log('eh');
    }catch{
        console.log('nah');
    }
})();

