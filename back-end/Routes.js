const express = require("express");
const url = require("url");
const fs = require("fs");
const { isNull } = require("util");
const routes = express.Router();

//rota HOME
 routes.get('/',(req,res)=>{

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    let num = url.parse(req.url,true).query;
    console.log(num);
    console.log(num.n === undefined);
    if (num.n === undefined){
    fs.readFile('./archives/list.json',(err,arquivo)=>{
        if(err) {
            console.log("ERRO! - falha ao ler json");
        }else{
            res.json(JSON.parse(arquivo));
        }
      });
    }else{
        fs.readFile("./archives/list.json",(err,file)=>{
            if(err) console.log("erro ao ler list.json");
            let ark = JSON.parse(file);
            res.json(ark.lista[num.n]);
        })
    }
 });

 //rota MAIN
routes.get('/',(req,res)=>{

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    let num = url.parse(req.url,true).query;
    console.log(num);
    fs.readFile("./archives/list.json",(err,file)=>{
        if(err) console.log("erro ao ler list.json");
        let ark = JSON.parse(file);
        res.json(ark.lista[num.n]);
    })
});

module.exports = routes;