// - mangaKa - version : 0.0.1
const express = require("express");
const fs = require('fs');
const porta = process.env.PORT;

const app = express();

app.get('/',(req,res)=>{
    fs.readFile('./archives/list.json',(err,arquivo)=>{
        if(err) {
            console.log("ERRO! - falha ao ler json");
        }else{
            res.send(arquivo);
        }
    })
});

app.listen(porta || 5000, ()=> console.log("servidor rodando na porta : "+ (porta || 5000)));