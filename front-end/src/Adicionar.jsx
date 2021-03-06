import React,{useState} from "react";
import SubHeader from "./componentes/SubHeader";
import Barra from "./componentes/Barra";
import Controles from "./componentes/Controles";
import Falselist from "./componentes/Falselist";
//import {Link} from "react-router-dom";
import Globais from "./Globais";
import { VscChevronRight } from "react-icons/vsc";
import { AiFillHeart } from "react-icons/ai";
//import { BsCheckAll } from "react-icons/bs";
//import login from './Login';
import './index.css';

/*await fetch(`http://127.0.0.1:5000/manga`,{
        method: 'POST'
        body: {"url": myParam}
        })
    .then(res => res.json())
    .then(data => {
        dados = data;
        console.log(dados);
        setReady(true);
    })*/
var dados = [];
export default function Info () {

    const [ready,setReady] = useState(false);
    const [start, setStart] = useState(false);
    //const [myS,setmyS] = useState(0);
    //const [arrlidos, setArrlidos] = useState([]);
    const [fav, setFav] = useState(false);
    var configuracao_inicial_favorito = false;
    var [urlServer, setUrlServer] = useState("");

    const getUrlServer = async () => {
        await fetch(`http://127.0.0.1:5000/server`)
        .then(res => res.json())
        .then(data => {
            setUrlServer(data.url);
            console.log("enable : ", data);
            setStart(true);
        });
    };
    const  buscar = async (final_url)=>{
        console.log("ready to staret : ", urlServer)
        await fetch(`${urlServer}manga/fetch`,{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"url": `https://mangayabu.top/manga/${final_url}`})
            })
        .then(res => res.json())
        .then(data => {
            dados = data;
            console.log("dados : ",dados);
            //Globais["dados_armazenados"].push(data);
            setReady(true);
        }).catch(e=> {console.log(e)});
    }
    const obter = async (pronto)=>{
       /* if (!Globais.log) {
            console.log("n??o esta logado. fazendo o login!");
            let res = await login(/*{mail: "moraeswesley290@gmail.com", pass: "mangaka#1"}*//*);
        }*/
        let urlParams = window.location.hash;
        let myParam = urlParams.split('=');

        if (pronto) {
            buscar(myParam[1]);
        }else{
            getUrlServer();
        }
        //console.log(myParam[1])
        //console.log(Globais["dados_armazenados"]);
       /* let fazer_requisicao = false;
        
        for (let i in Globais["dados_armazenados"]) {
            console.log(`teste : ${Globais["dados_armazenados"][i]["data"]["link"]}`)
            if (Globais["dados_armazenados"][i]["data"]["link"] === `https://mangayabu.top/manga/${myParam[1]}`) {
                console.log("encontado !");
                dados = Globais["dados_armazenados"][i]["data"];
                setReady(true);
                fazer_requisicao = true;
                break;
            }
        }
        
        if (!fazer_requisicao) {
            if (myS === 0 && !ready){
                console.log("n??o encontrado fazendo o fetch");
                setmyS(myS+1);
                
            }
        }*/
    }

    const adicionar_ao_banco = async (data) => {
        await fetch(`${urlServer}adicionar`,{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ nome: data[0], link: data[1] })
            })
        .then(res => res.json())
        .then(data => {
            console.log("resposta : ",data);
        }).catch(console.log);
    };


    const tags = (arr)=>{
        let li = arr.map(str => <li>{str}</li>);
        return <ul className="lis_tags">{li}</ul>;
    }
    /*const marcar = (cap) => {
        if (Globais.log) {
            let adicionar = true;
            let copy_arrlidos = [];
            for (let i in arrlidos) {
                if (cap === arrlidos[i]) {
                    adicionar = false;
                    console.log("capitulo removido!");
                }else{
                    copy_arrlidos.push(arrlidos[i]);
                }
            }
            if (adicionar) {
                copy_arrlidos.push(cap);
            }
            let ready_to_env = {
                "nome": dados["nome"],
                "mark" : copy_arrlidos
            }

            fetch(`https://vast-falls-98079.herokuapp.com/alterarcap`,{
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({mail: Globais.user["address"], password: Globais.user["password"], dados:  ready_to_env})
                })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data) {
                    setArrlidos(copy_arrlidos);//Globais.user["lidos"];
                    for (let key in Globais.user["lidos"]) {
                        if (Globais.user["lidos"][key]["nome"]=== dados["nome"]) {
                            Globais.user["lidos"][key] = ready_to_env;
                            break;
                        }
                    }
                }
            }).catch(e=> {console.log(e);setmyS(0)});
        }
    };*/

    const favoritos = (userData, state) => {
        let retornar = <div className="heart_fav" onClick={()=> add_or_pull_fav()}><AiFillHeart /></div>;

        //let favorito = false;
        if (!configuracao_inicial_favorito) {
            for (let i in userData["favoritos"]) {
                if (dados["nome"] === userData["favoritos"][i]["nome"]) {
                    console.log("encontrei");
                    retornar = <div className="heart_fav_on" onClick={()=> add_or_pull_fav()}><AiFillHeart /></div>;
                    break;
                }
            };
        };
        console.log(state,userData) 
        return retornar;
    };

    const add_or_pull_fav = async () => {
        let adicionar = true;
        let favoritos_new_list = [];
        for (let i in Globais.user["favoritos"]) {
            if (dados["nome"] === Globais.user["favoritos"][i]["nome"]) {
                adicionar = false;
            }else{
                favoritos_new_list.push(Globais.user["favoritos"][i]);
            };
        };

        if (adicionar) {
            favoritos_new_list.push({nome: dados["nome"], url: dados["link"], img: dados["capa1"]});
        };
        await fetch("https://vast-falls-98079.herokuapp.com/favoritos", {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({mail: Globais.user["address"], password: Globais.user["password"], nome: dados["nome"], link: dados["link"], img :dados["capa1"]})
        })
        .then(res => res.json())
        .then(data => {
            console.log("favorito configurado!", data);
            if (data) {
                Globais.user["favoritos"] = favoritos_new_list;
                setFav(!fav);
                console.log(fav);
            }
        });
    };
    const capit = (arr, link)=>{
        //console.log(arr);
       //let txt = link.split("manga/"); //BsCheckAll dados["nome"]
       /* let lidos = Globais.user["lidos"];
        for (let e in lidos) {
            if (lidos[e]["nome"] === dados["nome"] && arrlidos !== lidos[e]["mark"]) {
                console.log("igual");
                setArrlidos(lidos[e]["mark"]);
                break;
            }
        }
        console.log(lidos)*/
        let li = arr.map(array => { 
            /*let ok = false;
            for (let i in arrlidos) {
                if (array[1] === arrlidos[i]) {
                    ok = <BsCheckAll className="read_yes" onClick={()=> marcar(array[1])}/>;
                    break;
                }
            }*/
            return <div className="capitulos_align_flex"><li className="all_caps">{array[0].replace("#","")}</li></div>});

        return <div><ul>{li}</ul></div>;
    }
    const showCapitulos = ()=>{
        let ds = window.document.querySelector(".all_space");
        if (ds !== undefined && ds !== null) ds.classList.toggle("ocult");

    };
    const build = (go) =>{
        if (go) {
            console.log("capitulos",dados["capitulos"]);
            return <div>
                    <div className="all_space">
                        <div className="lista_de_capitulos">
                        <VscChevronRight className="close2"  onClick={()=> showCapitulos()}/>
                                    <div className="scroll_y_list">{capit(dados["capitulos"], dados["link"])}</div>
                                </div>
                    </div>
                <div className="background_image" style={{backgroundImage: `url(${dados["capa1"]})`}}>
                        <div className="fosco">
                
                <section className="subcenter">
                
                    <div className="colRow">
                        
                        <div className="quadro" style={{backgroundImage: `url(${dados["capa1"]})`}}></div>
                        <div className="joinTwo">
                            <div className="mgtop">
                            {Globais.log ? favoritos(Globais.user, fav) : <div className="heart_fav.fav"><AiFillHeart /></div>}
                            <h2 className="nomeprincipal">{dados["nome"]}</h2>
                            </div>
                            <div className="alignLink">
                                    <div className="div_leitura" onClick={()=>showCapitulos()}>
                                        <div className="icone_leitura"></div>
                                        <p>capitulos</p>
                                    </div>
                                    <div className="div_add_leitura" onClick={()=>adicionar_ao_banco([ dados["nome"], dados["link"] ])}>
                                        <div className="icone_leitura"></div>
                                        <p>adicionar</p>
                                    </div>
                                    
                            </div>
                        </div>
                    </div>

                    <div className="leftalign">
                    <p className="retirado">{tags(dados["categorias"])}</p>
                    </div>
                    <div className="sinopse"><p>{dados["sinopse"]}</p></div>
                </section>
                
                        </div>
                    </div>
            </div>
        }else{
            obter(start);
            return <>
                    <Falselist estilo_gradient={{height:"98vh"}}/>
                   </>
            
        }
    }

    return(
        <>
        <Barra />
        <Controles estilo={{marginTop: `${window.innerHeight - 55}px`,marginLeft: `${window.innerWidth < 700 ? 0 : ((window.innerWidth/2)-350)}px`}}/>
        <SubHeader />
                
        {build(ready)}        
        </>
    )
}