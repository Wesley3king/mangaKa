import React,{useState} from "react";
import SubHeader from "./componentes/SubHeader";
import Barra from "./componentes/Barra";
import Controles from "./componentes/Controles";
import './index.css';

var dados;
export default function Info () {

    const [ready,setReady] = useState(false);
    const obter = async ()=>{
        let urlParams = new URLSearchParams(window.location.search);
        let myParam = urlParams.get('n');
     fetch(`http://127.0.0.1:5000/manga?n=${myParam}`)
    .then(res => res.json())
    .then(data => {
        dados = data;
        console.log(dados);
        setReady(true);
    })
        
    }

    const build = (go) =>{
        if (go) {
            return <div className="background_image" style={{backgroundImage: `url(https://wesley3king.github.io/mangaKa/capas/${dados.img})`}}>
        <div className="fosco">
            <Barra />
            <Controles estilo={{marginTop: `${window.innerHeight - 55}px`,marginLeft: `${window.innerWidth < 700 ? 0 : ((window.innerWidth/2)-350)}px`}}/>
            <SubHeader />

            <section className="subcenter">
                <div className="quadro" style={{backgroundImage: `url(https://wesley3king.github.io/mangaKa/capas/${dados.img})`}}></div>
                <h2 className="nomeprincipal">{dados.name}</h2>
                <div className="leftalign">
                <p className="retirado">fonte: <a className="font" href={dados.provLINK}>{dados.prov}</a></p>
                </div>
                <div className="sinopse"><p>{dados.sinopse}</p></div>
            </section>
            



        </div>
    </div>
        }else{
            obter();
            
        }
    }

    return(
        <>
        {build(ready)}        
        </>
    )
}