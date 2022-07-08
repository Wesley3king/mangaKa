const db = require("./db");
const { all } = require("./Routes");
const sc = require("./scraping");
const tstf = require("./testefunctions");
//const axios = require("axios");

//vasculha o manga
async function vasculhar_manga (url, GUItype, dataAll = null) {
    let dad = [];
    if (dataAll) {
        dad = dataAll;
    }else if (GUItype === "old") {
        dad = await sc.entrar(url).catch(console.log);
    }else if (GUItype === "new") {
        dad = await tstf.verificar_capitulos_existentes2(url).catch(console.log);
    }

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
        console.log("adicionar capitulos antigos");
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
        console.log("adicionar capitulos novos : ", list);
        for (let i = (list.length-1); i >= 0; --i) {
        //for (let i in list) {
            console.log(i);
            let ready = false;
            while(!ready){
                let data_cap = await tstf.retirar_cap_no_link(list[i],nome).catch(console.log);
                console.log("dados data_cap : ", data_cap);
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
    console.log(dt);
    let sucess = await db.main_save(dt);
    console.log(sucess ? "atualizado":"falha ao atualizar");
 }

 //inserir um cap especifico
 const inserir_especifico = async (nome, i, position) => {
    let data = await tstf.retirar_cap(i, nome).catch(console.log);
    let sucess = await db.adicionar_cap_preciso(nome, link, position);
    console.log(sucess ? "inserido" : "falha");
 }
 //atualizar
 const atualizar_cap = async (url, nome, type = 2, allData = null) => {
    let list_sc = [];
    if (allData) {
        list_sc = allData;
    }else if (type === 1) {
        // velha GUI
        list_sc = await tstf.verificar_capitulos_existentes(url).catch(console.log);
    }else if (type === 2) {
        // nova GUI
        list_sc = await tstf.verificar_capitulos_existentes2(url).catch(console.log);
    };
    let list_db = await db.verificar_manga(nome).catch(console.log);

    console.log(list_sc[2]);
    let old_length = list_db["capitulos"].length;
    let new_length = list_sc[2].length;

    if (old_length != new_length) {
        let diferenca = new_length-old_length;
        console.log(`${diferenca} capitulos de diferença`);

        let lista = [];
        // novos capitulos

        let ultimo = list_db["capitulos"][0][1];
        console.log(`ultimo : ${ultimo}, scraping : ${list_sc[2][0][1]} `);
        if (ultimo != list_sc[2][0][1]) { //verifica se já não esta no ultimo cap
            for (let i = 0; i < list_db["capitulos"].length; ++i) {
                console.log(`i === ${i} | valores : ${ultimo} / ${list_sc[2][i][1]} // ${typeof ultimo} / ${typeof list_sc[2][i][1]} = ${ultimo === list_sc[2][i][1]}`);
                if (ultimo === list_sc[2][i][1]) {
                    console.log("ultimo capitulo identificado: "+ list_sc[2][i][0] +", length = "+ i);
                    for (let add = 0; add < i; ++ add) {
                        lista.push(list_sc[2][add]);
                    }
                    break;
                }
            }
            console.log("lista de novos : ",lista);
            await vasculhar_capitulos_lista(lista, false, nome).catch(console.log);
            lista = [];
            //fazer a verficação novamente pois os capitulos podem ter sidos atualizados
            list_db = await db.verificar_manga(nome).catch(console.log);
        }
        

        // capitulos antigos
        
        let mais_antigo = list_db["capitulos"][old_length-1][1];
        let mais_novo = list_sc[2][list_sc[2].length-1][1];
        console.log(`mais antigo : ${mais_antigo}, scraping : ${mais_novo} `);

        if (mais_antigo != mais_novo) {
            for (let i = 0; i < list_db["capitulos"].length; ++i) {
                if (mais_antigo === list_sc[2][i][1]) {
                    console.log("mais velho capitulo identificado: "+ list_sc[2][i][0] +" - "+ list_db["capitulos"][old_length-1][0]+", length = "+ i);
    
                    let start_length = i+1;
                    let add_olds = list_sc[2].length;
                    console.log(`add_olds : ${i}`);
                    for (let add = start_length; add < add_olds; ++add) {
                        lista.push(list_sc[2][add]);
                    }
                    break;
                }
            }
            console.log("lista de antigos : ",lista);
            await vasculhar_capitulos_lista(lista, true, nome).catch(console.log);
        }
    }
 }

//testa se o manga existe
const vasculhar_main = async () => {
    let main = await db.find_main().catch(console.log);

   for(let e of main["lancamentos"]){

       //let existe = await db.verificar_manga(e[0]).catch(console.log);

        /*if (typeof existe === "object" && existe != null) {
            
            let len = existe["capitulos"].length;

            if (len === 0) {
                console.log("nenhum capitulo no manga");
                await adicionar_manga_especifico(existe["nome"], existe["link"]);
            }else{
                
            }
            //atualizar
        }else{
            console.log(`o manga : ${e[0]} não existe`);
            await vasculhar_manga(e[2]);
        }*/

        await adicionar_manga_especifico(e[0], e[2]).catch(console.log);
        console.log(`o manga ${e[0]} acabou de ser verificado`);

    };
}

//type = 1-velha GUI, 2-NOVA GUI
const adicionar_manga_especifico = async (nome, url, qt = null, type = null) => {
    let existe = await db.verificar_manga(nome).catch(console.log);
    let novo_data = [];
    //diferencia a GUI do site;
    if (!type) {
        let teste = await sc.verificarGUI(url).catch(console.log);
        teste ? type = 2 : type = 1;
    }
    console.log(`type === ${type}`);
    if (type === 1) {
        novo_data = await tstf.verificar_capitulos_existentes(url).catch(console.log);
    }else if (type === 2) {
        novo_data = await tstf.verificar_capitulos_existentes2(url).catch(console.log);
    }
    //let novo_data = await tstf.verificar_capitulos_existentes(url).catch(console.log);

        if (typeof existe === "object" && existe != null) {
            console.log(`o manga : ${nome} EXISTE`);

            let lista = [];
            if (qt) {
                for (let num = qt; num < novo_data[2].length; ++num) {
                    lista.push(novo_data[2][num]);
                }
                console.log("vasculhando a lista : ", lista);
                await vasculhar_capitulos_lista(lista, true, nome, 2).catch(console.log);
            }else{
                
                if (existe["capitulos"].length = 0) {
                    //caso o manga exista mas não tem nenhum cap
                    lista = novo_data[2]
                    console.log("vasculhando a lista do 0 : ", lista);
                    await vasculhar_capitulos_lista(lista, true, nome).catch(console.log);
                }else{
                    //fara a verificação de novos e velhos cap(apenas os ultimos caso não tenham sido adicionados);
                    await atualizar_cap(url, nome, type, novo_data).catch(console.log);
                    console.log("terminado! : ", nome);
                }
              /*lista = novo_data[2]
                console.log("vasculhando a lista do 0 : ", lista);
                await vasculhar_capitulos_lista(lista, true, nome).catch(console.log);*/
            }
        }else{
            console.log(`o manga : ${nome} não existe`);
            if (type === 1) {
                await vasculhar_manga(url, "old", novo_data);
            }else{
                await vasculhar_manga(url, "new", novo_data);
            }
        }
}

module.exports = { atualizarMain, vasculhar_main , adicionar_manga_especifico, inserir_especifico};