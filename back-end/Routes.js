const express = require("express");
const url = require("url");
const fs = require("fs");
const sc = require("./scraping");
const { isNull } = require("util");
const db = require("./db");
const cors=require("cors");
const routes = express.Router();
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
//rota HOME - rota HOME logado
 routes.get('/',async (req,res)=>{

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    res.json(await sc.obter());
 });

 routes.get('/tst',async (req,res)=>{

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    res.json(await sc.entrar2("https://mangayabu.top/manga/martial-peak/"/*'https://mangayabu.top/manga/solo-leveling/'*/));
 });

 //eviar destaques
 routes.get("/destaques",(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    fs.readFile("./archives/Destaques.json",(err,file)=>{
        if(err) console.log("erro ao ler list.json");
        let ark = JSON.parse(file);
        res.json(ark);
    });
 });
routes.use(express.json());//habilita que todas as rotas vão receber json
routes.post('/log', async (req,res)=>{
    let data = req.body;
    console.log(data);
    //autenticidade
    /*if (data.inser){
        let inser = await db.inserir({nome:data.nome, password: data.senha});
        res.status(201).send(inser);
    }else{*/
    let aut = await db.User_dados({user: data.nome});
    console.log(aut);
    if (aut.length === 0) {
        res.status(404).send("dados invalidos");
    }else{
        for(let element of aut) {
            if (element.s_senha_usuario === data.senha) {
                let favoritos = await db.fav_lidos({tabela: element.s_table_usuario});
                res.status(200).send({
                    "nome" : element.s_nome_usuario,
                    "senha": element.s_senha_usuario,
                    fav: favoritos
                });
            }
        }



        
    }

    
    //retorno
    
});
 //rota MAIN
 routes.use(cors(corsOptions));
routes.post('/manga',async (req,res)=>{

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    let req_data = req.body;
    console.log("requisicao manga : ",req_data.url);

    let dad = await sc.entrar(req_data.url);

    res.json({"data": dad});

    
});

//busca completa do manga
routes.post('/total',async (req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    let req_data = req.body;
    console.log("requisicao total manga : ",req_data.link);

    let dad = await sc.entrar(req_data.link).catch(console.log);

    let cap = []
    for (let i of dad[2]) {
        let data_cap = await sc.leitor(`https://mangayabu.top/?p=${i[1]}`).catch(console.log);
        console.log(i);
        cap.push([i[0],i[1], data_cap[0], data_cap[1], data_cap[3]]);
    };

    let dados = {
        nome : dad[3],
        capa1 : dad[4],
        capa2 : "",
        sinopse : dad[0],
        link : req_data.link,
        categorias : dad[1],
        capitulos : cap
    }

    res.json(dados);

    //https://mangayabu.top/?p=
});

//leitor

routes.post('/manga/leitor', async (req, res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    let req_data = req.body;
    console.log("requisicao leitor : ",req_data.url);
    let dados = await sc.leitor(req_data.url).catch(e=>console.log(e));
    console.log(dados);
    res.json({"data": dados});
});

//pesquisar

routes.post('/pesquisar', async (req, res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    let req_data = req.body;
    console.log("requisicao pesquisa : ",req_data.nome);
    let dados = await sc.search("https://mangayabu.top/lista-de-mangas/#mangasearch",req_data.nome).catch(e=>console.log(e));
    console.log(dados);
    res.json({"data": dados});
});

module.exports = routes;