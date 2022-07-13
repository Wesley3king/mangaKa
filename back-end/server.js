// - mangaKa - version : 0.0.1
const express = require("express");
const fs = require('fs');
const func = require("./functions");
const routes = require("./Routes");
const porta = process.env.PORT || 5000;

const app = express();

app.use(routes);
//  |
//          LEMBRETE : colocar a url do banco ao iniciar o servidor
//  |  

//adicionar (nome, url , length)
// ultimo_cap_no_mangayabu = 2379 / ultimo_ready = 2313 / total_length = 67/78 / added = 457;   1933
//func.adicionar_manga_especifico("Yuusha ga Shinda!: Murabito no Ore ga Hotta Otoshiana ni Yuusha ga Ochita Kekka","https://mangayabu.top/manga/yuusha-ga-shinda-murabito-no-ore-ga-hotta-otoshiana-ni-yuusha-ga-ochita-kekka", null, null);

// fazer a atualização dos mangas no main
//func.vasculhar_main();

//inserir um capitulo preciso (nome, ['Capítulo #18', '917161'], position);
//func.inserir_especifico();

//atualizar o main
//func.atualizarMain();

app.listen(porta, ()=> console.log("servidor rodando na porta : "+ porta));