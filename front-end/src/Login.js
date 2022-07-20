import Globais from "./Globais";

async function user_fetch (email, senha) {
    let response = await fetch(`https://vast-falls-98079.herokuapp.com/login`,{
         method: 'POST',
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify({"mail": email, "password": senha})
         })
     .then(d => d.json())
     .catch(console.log);
 
     return response;
 }

export default async function login (data = null) {
    if (!data) {
        let str_ls_mail = localStorage.getItem("mangaka_user_mail");
        let str_ls_pass = localStorage.getItem("mangaka_user_password");

        let response = await user_fetch(str_ls_mail, str_ls_pass);

        Globais.user = response;
        Globais.log = response ? true : false;

        return response ? true : false;

    }else{
        localStorage.setItem("mangaka_user", data.mail);
        localStorage.setItem("mangaka_user_password", data.pass);

        let response = await user_fetch(data.mail, data.pass);

        Globais.user = response;
        Globais.log = response ? true : false;

        return response ? true : false;
    }
}