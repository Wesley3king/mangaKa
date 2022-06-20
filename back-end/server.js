// - mangaKa - version : 0.0.1
const express = require("express");
const fs = require('fs');
const func = require("./functions");
const routes = require("./Routes");
const porta = process.env.PORT || 5000;

const app = express();

app.use(routes);

//atualização automatica
func.vasculhar_main(/*"https://mangayabu.top/manga/naze-boku-no-sekai-wo-daremo-oboeteinai-no-ka/""Naze Boku no Sekai wo Daremo Oboeteinai no ka"*/);

app.listen(porta, ()=> console.log("servidor rodando na porta : "+ porta));