//mongo db connection
const mongoClient = require("mongodb").MongoClient;

const url = "mongodb+srv://king_of_project:UwXWp7BPdGrY1R4l@cluster0.5bcwwx7.mongodb.net/?retryWrites=true&w=majority";
const database = "mangaka", user_banco = "usuario", main_banco = "mainpage", data_banco = "dataall";
const server_banco = "servidor";
const client_col = "usuarios", user_database = "users";

//estabelece a conexão:
const conectar = async ()=> {
        const client = await mongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('conectado!');
        return client.db(database);
};

const conectar_user = async () => {
    const client = await mongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('conectado!');
    return client.db(user_database);
}
//atualizar url MAINSERVER
const urlUpdate = async (url) => {
    let banco = await conectar();

    await banco.collection(server_banco).updateOne({}, {$set: {url: url}});

    return true;
}
//gravar o main
const main_save = async (nomes) => {
    let banco = await conectar();

    await banco.collection(main_banco).deleteOne({}, (err, result)=>{
        if (err) console.log(err)
        else console.log("deletado");
    });

    let ok = await banco.collection(main_banco).insertOne(nomes, (err, result)=>{
        if (err) console.log(err)
        else console.log("inserido");
    });

    if (ok) return true;
};

//enviar o main
const find_main = async ()=> {
    let db = await conectar();
    let data = await db.collection(main_banco).findOne({},{projection: {_id: 0}});
    return data;
}

//inserir no data_banco
const inserir_novo_manga = async (manga) =>{
    let db = await conectar();
    let ad = await db.collection(data_banco).insertOne(manga, (err, result)=>{
        if (err) console.log(err)
        else console.log("inserido");
    });
    //return ad ? true : false;
};

// procurar no banco
const verificar_manga = async (nome_m) => {
    let db = await conectar();
    let encontrar = await db.collection(data_banco).findOne({nome: nome_m}, (err, result)=>{
        if (err) console.log(err);
    });
    return encontrar;
}
//enviar o manga do banco
const obter_manga = async (link) => {
    let db = await conectar();
    let encontrar = await db.collection(data_banco).findOne({"link": link}, {projection : {_id: 0}});
    return encontrar;
}

//obter capitulo
const obter_capitulo = async (link, num_url) => {
    let db = await conectar();
    let encontrar = await db.collection(data_banco).findOne({"link": link}, {projection : {_id: 0}});
    return encontrar;
}
//adicionar um capitulo
const adicionar_capitulo = async (nome,data) => {
    let db = await conectar();
    let encontrar = await db.collection(data_banco).update0ne({"nome": nome}, {$push})
}

//usuario
//adicionar usuario
const add_user = async (data) => {
    let db = await conectar_user();
    let insert = await db.collection(user_banco).insertOne(data);
    return insert ? true : false;
}
//adicionar favoritos

//adicionar capitulo lido

const add_readed = async (mail, senha, data) => {
    const db = await conectar_user();
    let url = "favoritos.0.lidos"
    //{"$each": [data], "$position": 0}
    let inserir = await db.collection(data_banco).updateMany({address: mail, password : senha}, {"$push": { 'favoritos[0].lidos' : [data] }});
    //return typeof inserir === "object" ? true : false;
    console.log(inserir);
}
//remover favorito

//remover capitulo lido
const pull_readed = async (mail, senha, data) => {
    let db = await conectar_user(); // data === nome
    let inserir = await db.collection(user_banco).updateOne({address: mail, password : senha}, {"$pull": {"lidos" : {nome : data}}});
    console.log(inserir);
    return typeof inserir === "object" ? true : false;
}
pull_readed("moraeswesley290@gmail.com", "mangaka#1", "Solo Leveling", "37828");
//ler usuario
const read_user = async (mail, senha) => {
    let db = await conectar_user();
    let data = await db.collection(user_banco).findOne({address : mail, password: senha},{projection : {_id : 0}});
    return data ? data : false;
}
//add_readed("moraeswesley290@gmail.com", "mangaka#1", "https://mangayabu.top/manga/solo-leveling", "78369872").catch(console.log);
module.exports = {main_save, find_main, inserir_novo_manga, urlUpdate, verificar_manga, obter_manga, add_user, read_user, pull_readed}