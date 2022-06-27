import Globais from "./Globais";

const login = async (data = null) => {
    if (!data) {
        let str_ls_mail = localStorage.getItem("mangaka_user_mail");
        let str_ls_pass = localStorage.getItem("mangaka_user_password");

        let response = await user_fetch(str_ls_mail, str_ls_pass);

        Globais.user = response;

        return response ? true : false;

    }else{
        localStorage.setItem("mangaka_user", data.mail);
        localStorage.setItem("mangaka_user_password", data.pass);

        let response = await user_fetch(data.mail, data.pass);

        Globais.user = response;

        return response ? true : false;
    }
}
async function user_fetch (email, senha) {
   let response = await fetch(`http://127.0.0.1:5000/login`,{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"mail": email, "password": senha})
        })
    .then(d => d.json())
    .catch(console.log);

    return response;
}

module.exports =  login;