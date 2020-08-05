const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const PORT = 3001;

app.get('/get-meta-data/:module_name/:screen_name',(req,res,next)=>{
    const module_name = req.params.module_name;
    const screen_name = req.params.screen_name;
    
    if(module_name && screen_name){
        const screen_path = 'specification/'+module_name + '/' + screen_name + '.json';
        if(fs.existsSync(path.resolve(__dirname,screen_path))){
            const data = fs.readFileSync(screen_path);
            res.status(200).send(data).end();
        }else{
            res.status(404).send({message:'folder or file path does not exists'});
        }
    }else{
        res.json({'message':'please enter both parameter'});
    }
    res.end();
});

app.listen(PORT,()=>{
    console.log(' server started listerning to ',PORT);
})