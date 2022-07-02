// - mangaKa - version : 0.0.1
const express = require("express");
const fs = require('fs');
const func = require("./functions");
const routes = require("./Routes");
const porta = process.env.PORT || 5000;

const app = express();

app.use(routes);

//adicionar (nome, url , length)
// ultimo_cap_no_mangayabu = 2329 / ultimo_ready = 2313 / total_length = 17 / added = 1724;
func.adicionar_manga_especifico("Martial Peak","https://mangayabu.top/manga/martial-peak", 606);

// fazer a atualização dos mangas no main
//func.vasculhar_main();

//inserir um capitulo preciso (nome, ['Capítulo #18', '917161'], position);
//func.inserir_especifico();

app.listen(porta, ()=> console.log("servidor rodando na porta : "+ porta));