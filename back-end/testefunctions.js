const sc = require("./scraping");

//retirar os capitulos
const retirar_cap = async (i) => {
    console.log("iniciando a busca de mais um capitulo");
    let data_cap = await sc.leitor(`https://mangayabu.top/?p=${i[1]}`).catch(console.log);

    if (typeof data_cap[0] != "string" || typeof data_cap[3] != "object"){
        return false;
    }else{
        return [i[0],i[1], data_cap[0], data_cap[1], data_cap[3]]
    }
}
const retirar_cap_no_link = async (i) => {
    console.log("iniciando a busca de mais um capitulo");
    let data_cap = await sc.leitor(`https://mangayabu.top/?p=${i[1]}`).catch(console.log);

    if (typeof data_cap[0] != "string" || typeof data_cap[3] != "object"){
        return false;
    }else{
        return [data_cap[0], data_cap[1], data_cap[3]]
    }
}

//verificar os capitulos
const verificar_capitulos_existentes = async (url) => {
    return await sc.entrar(url).catch(console.log);
}


module.exports = {retirar_cap, verificar_capitulos_existentes, retirar_cap_no_link};