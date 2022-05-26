// database mySQL

//datbase mySQL 2

const conectar = async ()=> {
    if (global.conexao && global.conexao.state != 'disconected')
        return global.conexao;
    const mysql = require('mysql2/promise');
    const connect = mysql.createConnection("mysql://root:root@127.0.0.1:3306/mangaKa");
    console.log("connectado ao db");
    global.conexao = connect;
    return connect;
};

const User_dados = async (dados)=>{
    const con = await conectar();
    let val = [dados.user, dados.senha];
    let sql = "select * from usuario where s_nome_usuario=? and s_senha_usuario=?;";
    const [linhas] = await con.query(sql,val);
    return await linhas;
};

const inserir = async (usuario) => {
    let con = await conectar();
    let sql = "insert into cliente values ((select max(u.i_ind_usuario)+1 from usuarios u),?,?)";
    let second_table = `${usuario.nome}${Math.round(Math.random()*99)}`;
    let valores = [usuario.nome, usuario.password, second_table];
    await con.query(sql, valores);
    try {
        let sql2 = `create table ${second_table} (i_ind_lido int primary key auto_increment);`;
        await con.query(sql2);
    } catch (err) {
        console.log("erro em inserir : ",err);
    }
}

const atualizar = async (id,cliente) => { 
    const con = await conectar();
    const sql = "update cliente set nasc=? where indice=?";
    const valores = [cliente.nasc, id];
    await con.query(sql,valores);
}

const deletar = async (id)=>{
    const con = await conectar();
    const sql = "delete from cliente where indice=?";
    const valores = [id];
    await con.query(sql,valores);
}
module.exports = {User_dados, inserir, atualizar, deletar};