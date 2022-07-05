const db = require("./db");
const sc = require("./scraping");
const tstf = require("./testefunctions");
//const axios = require("axios");

//vasculha o manga
async function vasculhar_manga (url) {
    let dad = await sc.entrar(url).catch(console.log);

    let dados = {
        nome : dad[3],
        capa1 : dad[4],
        sinopse : dad[0],
        link : url,
        categorias : dad[1],
        capitulos : []
    }

    await db.inserir_novo_manga(dados).catch(console.log);

    //console.log(dad[2]);
    for (let i in dad[2]) {
        console.log(i);
        let ready = false;
        while(!ready){
            let data_cap = await tstf.retirar_cap(dad[2][i], dad[3]).catch(console.log);
            if (data_cap){
                console.log(`capitulo ${dad[2][i][0]} de length = ${i} / inserindo...`);
                //await db.adicionar_capitulo_velho(dad[3],[dad[2][i][0],dad[2][i][1], data_cap[0], data_cap[1], data_cap[3]]);
                await db.adicionar_capitulo_velho(dad[3], data_cap);
                console.log(`capitulo ${dad[2][i][0]} de length = ${i} /adicionado`);
                ready = true;
            }else{
                console.log("falha na retirada do capitulo, restartando");
            }
        }
    };

    return dados;
}

//vasculhar pelo length
async function start_pelo_length (url, qt) {

}
//vasculhar uma certa lista de mangas [ 'Capítulo #2215', '922119' ],
async function vasculhar_capitulos_lista (list, type, nome) {
    // type === true : capitulos antigos / type = false : novo capitulos
    if (type) {
        for (let i in list) {
            console.log(i);
            let ready = false;
            while(!ready){
                let data_cap = await tstf.retirar_cap_no_link(list[i], nome).catch(console.log);
                if (data_cap){
                    console.log(`capitulo ${list[i][0]} de length = ${i} /inserindo...`);
                    await db.adicionar_capitulo_velho(nome, data_cap);
                    console.log(`capitulo ${list[i][0]} de length = ${i} /adicionado`);
                    ready = true;
                }else{
                    console.log("falha na retirada do capitulo, restartando");
                }
            }
        }
    }else{
        for (let i in list) {
            console.log(i);
            let ready = false;
            while(!ready){
                let data_cap = await tstf.retirar_cap_no_link(list[i],nome).catch(console.log);
                if (data_cap){
                    console.log(`capitulo ${list[i][0]} de length = ${i} /inserindo...`);
                    await db.adicionar_capitulo_novo(nome, data_cap);
                    console.log(`capitulo ${list[i][0]} de length = ${i} /adicionado`);
                    ready = true;
                }else{
                    console.log("falha na retirada do capitulo, restartando");
                }
            }
        }
    }
}
//inserir manga
async function insert_Manga (data) {
    let ins = await db.inserir_novo_manga(data).catch(console.log);
    console.log(ins ? "sucesso" : "ERRO na inserção do manga");
}
//atualiza o main
let atualizarMain = async () => {
    let dt = await sc.obter();
    let sucess = await db.main_save(JSON.parse(dt));
    console.log(sucess ? "atualizado":"falha ao atualizar");
 }

 //inserir um cap especifico
 const inserir_especifico = async (nome, i, position) => {
    let data = await tstf.retirar_cap(i, nome).catch(console.log);
    let sucess = await db.adicionar_cap_preciso(nome, link, position);
    console.log(sucess ? "inserido" : "falha");
 }
 //atualizar
 const atualizar_novo_cap = async (url, nome) => {
    let list_sc = await tstf.verificar_capitulos_existentes(url).catch(console.log);
    let list_db = await db.verificar_manga(nome).catch(console.log);

    console.log(list_sc[2]);
    let old_length = list_db["capitulos"].length;
    let new_length = list_sc[2].length;

    if (old_length != new_length) {
        let diferenca = new_length-old_length;
        console.log(`${diferenca} capitulos de diferença`);
        let lista = [];

        for (let i = 0; i < diferenca; ++i) {

        }
    }
 }

//testa se o manga existe
const vasculhar_main = async () => {
    let main = await db.find_main().catch(console.log);

   for(let e of main["lancamentos"]){

       let existe = await db.verificar_manga(e[0]).catch(console.log);

        if (typeof existe === "object" && existe != null) {
            
            let len = existe["capitulos"].length;

            if (len === 0) {
                console.log("nenhum capitulo no manga");
                await adicionar_manga_especifico(existe["nome"], existe["link"], false);
            }
            //atualizar
        }else{
            console.log(`o manga : ${e[0]} não existe`);
            await vasculhar_manga(e[2]);
        }
    };
}

const adicionar_manga_especifico = async (nome, url, qt) => {
    let existe = await db.verificar_manga(nome).catch(console.log);
    //let novo_data = await tstf.verificar_capitulos_existentes(url).catch(console.log);
    let novo_data = await tstf.verificar_capitulos_existentes2(url).catch(console.log);

        if (typeof existe === "object" && existe != null) {
            console.log(`o manga : ${nome} EXISTE`);

            let lista = [];
            if (qt) {
                for (let num = qt; num < novo_data[2].length; ++num) {
                    lista.push(novo_data[2][num]);
                }
                console.log("vasculhando a lista : ", lista);
                await vasculhar_capitulos_lista(lista, true, nome).catch(console.log);
            }else{
                lista = novo_data[2]
                console.log("vasculhando a lista do 0 : ", lista);
                await vasculhar_capitulos_lista(lista, true, nome).catch(console.log);
            }
        }else{
            console.log(`o manga : ${nome} não existe`);
            await vasculhar_manga(url);
        }
}

module.exports = { atualizarMain, vasculhar_main , adicionar_manga_especifico, inserir_especifico};