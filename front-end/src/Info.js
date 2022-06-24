import React,{useState} from "react";
import SubHeader from "./componentes/SubHeader";
import Barra from "./componentes/Barra";
import Controles from "./componentes/Controles";
import Falselist from "./componentes/Falselist";
import {Link} from "react-router-dom";
import Globais from "./Globais";
import { VscChromeClose, VscChevronRight } from "react-icons/vsc";
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
export default function Info (final_url) {

    const [ready,setReady] = useState(false);
    const [myS,setmyS] = useState(0);

    const  buscar = async (final_url)=>{

        await fetch(`http://127.0.0.1:5000/manga`,{
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
    const obter = ()=>{
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
    const capit = (arr, link)=>{
        //console.log(arr);
        let txt = link.split("manga/");
        let li = arr.map(array => <Link style={{textDecoration: "none",color: "white"}}to={`/manga/leitor?n=${array[1]}&l=${txt[1]}`}><li className="all_caps">{array[0].replace("#","")}</li></Link>);

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