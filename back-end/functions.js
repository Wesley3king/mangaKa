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
    for (let i of dad[2]) {
        console.log(i);
        let ready = false;
        while(!ready){
            let data_cap = await tstf.retirar_cap(i).catch(console.log);
            if (data_cap){
                console.log("mais um capitulo adicionado!");
                await db.adicionar_capitulo_velho(dad[3],[i[0],i[1], data_cap[0], data_cap[1], data_cap[3]]);
                ready = true;
            }else{
                console.log("falha na retirada do capitulo, restartando");
            }
        }
    };

    return dados;
}

//vasculhar uma certa lista de mangas [ 'Capítulo #2215', '922119' ],
async function vasculhar_capitulos_lista (list, type, nome) {
    if (type) {
        for (let i of list) {
            console.log(i);
            let ready = false;
            while(!ready){
                let data_cap = await tstf.retirar_cap_no_link(i).catch(console.log);
                if (data_cap){
                    console.log("mais um capitulo adicionado!");
                    await db.adicionar_capitulo_velho(nome, [i[0],i[1], data_cap[0], data_cap[1], data_cap[2]]);
                    ready = true;
                }else{
                    console.log("falha na retirada do capitulo, restartando");
                }
            }
        }
    }else{
        for (let i of list) {
            console.log(i);
            let ready = false;
            while(!ready){
                let data_cap = await tstf.retirar_cap_no_link(i).catch(console.log);
                if (data_cap){
                    console.log("mais um capitulo adicionado!");
                    await db.adicionar_capitulo_novo(nome, [i[0],i[1], data_cap[0], data_cap[1], data_cap[3]]);
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

//testa se o manga existe
const vasculhar_main = async () => {
    let main = await db.find_main().catch(console.log);

   for(let e of main["lancamentos"]){

       let existe = await db.verificar_manga(e[0]).catch(console.log);

        if (typeof existe === "object" && existe != null) {
            //adicionar velhos capitulos
            let novos_dados = await tstf.verificar_capitulos_existentes(e[2]).catch(console.log);

            let new_length = novos_dados[2].length;
            let old_length = existe["capitulos"].length;
            if (old_length === 0) {
                console.log("sem nenhum cap adicionado");
                await vasculhar_capitulos_lista(novos_dados[2], true, existe["nome"]);
            }else{
                let old_cap = existe["capitulos"][0][0].split("#");
                let new_cap = novos_dados[2][0][0].split("#");
                let new_num = Number(new_cap[1]);
                let old_num = Number(old_cap[1]);
    
                if (new_length != old_length) {
                    let need_add = []
                    for (let i in novos_dados[2]) {
                        //posivel erro
                        if (novos_dados[2][i][0] != existe["capitulos"][i][0]) {
                            need_add.push(novos_dados[2][i]);
                        }
                    }
                    if (need_add.length != 0) {
                        if(old_num < new_num) {
                            console.log("capitulo velho a ser adicionado");
                            await vasculhar_capitulos_lista(need_add, true, existe["nome"]);
                        }else{
                            console.log("capitulo novo a ser adicionado");
                            await vasculhar_capitulos_lista(need_add, false, existe["nome"]);
                        }
                    }
                }
            }
            //atualizar
        }else{
           //console.log(e[2]);
           console.log("não existe!");
           let dados = await vasculhar_manga(e[2]);
           //let dados = await vasculhar_manga(url);
           //await insert_Manga(dados);
        };
    };
    /*let existe = await db.verificar_manga(t).catch(console.log);
    if (typeof existe === "object" && existe != null) {
        console.log(existe);
        console.log( await existe["nome"] === t ? "tem" : "não tem");
    }else{
        console.log("não tem")
    }
        //console.log(await existe);*/
}

module.exports = { atualizarMain, vasculhar_main };