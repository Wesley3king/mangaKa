//mongo db connection
const mongoClient = require("mongodb").MongoClient;

const url = "";
const database = "mangaka", user_banco = "usuario", main_banco = "mainpage", data_banco = "dataall";
const server_banco = "servidor";

//estabelece a conexão:
const conectar = async ()=> {
        const client = await mongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('conectado!')
        return client.db(database)
};
//atualizar url MAINSERVER
const urlUpdate = async (url) => {
    let banco = await conectar();

    await banco.collection(server_banco).updateOne({}, {$set: {url: url}});

    return true;
}
//gravar o main
const main_save = async (nomes) => {
    let banco = await conectar();
    await banco.collection(main_banco).deleteOne({});

    let ok = await banco.collection(main_banco).insertOne(nomes);

    if (ok) return true;
};

//enviar o main
const find_main = async ()=> {
    let db = await conectar();
    let data = await db.collection(main_banco).findOne({},{projection: {_id: 0}});
    return await data;
}

//inserir no data_banco
const inserir_novo_manga = async (manga) =>{
    let db = await conectar();
    let ad = await db.collection(data_banco).insertOne(manga);
    return await ad ? true : false;
};

// procurar no banco
const verificar_manga = async (nome_m) => {
    let db = await conectar();
    let encontrar = await db.collection(data_banco).findOne({nome: nome_m},{projection: {_id: 0}});
    //console.log("db : ",await encontrar);
    return await encontrar;
}
//enviar o manga do banco
const obter_manga = async (link) => {
    let db = await conectar();
    let encontrar = await db.collection(data_banco).find({"link": link}, (err, result)=>{
        if (err) console.log(err)
        else console.log("inserido");
    });
    return encontrar;
}
//adicionar um capitulo
const adicionar_capitulo_velho = async (nome,data) => {
    let db = await conectar();
    let inserir = await db.collection(data_banco).updateMany({"nome": nome}, {"$push": {capitulos : {"$each" : [data]}}});
    return typeof inserir === "object" ? true : false;

}
const adicionar_capitulo_novo = async (nome,data) => {
    let db = await conectar();
    let inserir = await db.collection(data_banco).updateMany({"nome": nome}, {"$push": {capitulos : {"$each": [data], "$position": 0}}});
    return typeof inserir === "object" ? true : false;
}
const adicionar_cap_preciso = async (nome, data, pos) => {
    let db = await conectar();
    let inserir = await db.collection(data_banco).updateMany({"nome": nome}, {"$push": {capitulos : {"$each": [data], "$position": pos}}});
    return typeof inserir === "object" ? true : false;
}
module.exports = {main_save, find_main, inserir_novo_manga, urlUpdate, verificar_manga, obter_manga, adicionar_capitulo_novo, adicionar_capitulo_velho, adicionar_cap_preciso}