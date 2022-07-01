import React,{useState} from "react";
import SubHeader from "./componentes/SubHeader";
import Barra from "./componentes/Barra";
import Controles from "./componentes/Controles";
import Falselist from "./componentes/Falselist";
import {Link} from "react-router-dom";
import Globais from "./Globais";
import { VscChevronRight } from "react-icons/vsc";
import { AiFillHeart } from "react-icons/ai";
import { BsCheckAll } from "react-icons/bs";
import login from './Functions';
import './index.css';

/*await fetch(`http://127.0.0.1:5000/manga`,{
        method: 'POST',
        
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
    const [myS,setmyS] = useState(0);
    const [arrlidos, setArrlidos] = useState([]);

    const  buscar = async (final_url)=>{

        await fetch(`https://vast-falls-98079.herokuapp.com/manga`,{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"url": `https://mangayabu.top/manga/${final_url}`})
            })
        .then(res => res.json())
        .then(data => {
            dados = data.data;
            console.log("dados : ",dados);
            Globais["dados_armazenados"].push(data);
            setReady(true);
        }).catch(e=> {console.log(e);setmyS(0)});
    }
    const obter = async ()=>{
        if (!Globais.log) {
            console.log("não esta logado. fazendo o login!");
            let res = await login(/*{mail: "moraeswesley290@gmail.com", pass: "mangaka#1"}*/);
        }
        let urlParams = window.location.hash;
        let myParam = urlParams.split('=');
        //console.log(myParam[1])
        //console.log(Globais["dados_armazenados"]);
        let fazer_requisicao = false;
        
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
                console.log("não encontrado fazendo o fetch");
                setmyS(myS+1);
                buscar(myParam[1]);
            }
        }
    }

    const tags = (arr)=>{
        let li = arr.map(str => <li>{str}</li>);
        return <ul className="lis_tags">{li}</ul>;
    }
    const marcar = (cap) => {
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
    };

    const capit = (arr, link)=>{
        //console.log(arr);
        let txt = link.split("manga/");//BsCheckAll dados["nome"]
        let lidos = Globais.user["lidos"];
        for (let e in lidos) {
            if (lidos[e]["nome"] === dados["nome"] && arrlidos !== lidos[e]["mark"]) {
                console.log("igual");
                setArrlidos(lidos[e]["mark"]);
                break;
            }
        }
        console.log(lidos)
        let li = arr.map(array => { 
            let ok = false;
            for (let i in arrlidos) {
                if (array[1] === arrlidos[i]) {
                    ok = <BsCheckAll className="read_yes" onClick={()=> marcar(array[1])}/>;
                    break;
                }
            }
            return <div className="capitulos_align_flex"> {ok ? ok : <BsCheckAll className="read_no" onClick={()=> marcar(array[1])}/>} <Link style={{textDecoration: "none",color: "white"}}to={`/manga/leitor?n=${array[1]}&l=${txt[1]}`}><li className="all_caps">{array[0].replace("#","")}</li></Link></div>});

        return <div><ul>{li}</ul></div>;
    }
    const showCapitulos = ()=>{
        let ds = window.document.querySelector(".all_space");
        if (ds !== undefined && ds !== null) ds.classList.toggle("ocult");

    }
    const build = (go) =>{
        if (go) {
            //console.log("capitulos",dados["capitulos"]);
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
                            <div className="heart_fav">
                                        <AiFillHeart />
                                    </div>
                                <h2 className="nomeprincipal">{dados["nome"]}</h2>
                            </div>
                            <div className="alignLink">
                                    <div className="div_leitura" onClick={()=>showCapitulos()}>
                                        <div className="icone_leitura"></div>
                                        <p>capitulos</p>
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
            obter();
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