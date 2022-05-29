import React,{useState} from "react";
import SubHeader from "./componentes/SubHeader";
import Barra from "./componentes/Barra";
import Controles from "./componentes/Controles";
import Globais from "./Globais";
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

    const  buscar = async ()=>{
        await fetch(`http://127.0.0.1:5000/manga`,{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"url": Globais.link})
            })
        .then(res => res.json())
        .then(data => {
            dados.push(data.data);
            console.log(dados);
            setReady(true);
        }).catch(e=> {console.log(e);setmyS(0)});
    }
    const obter = ()=>{
        if (myS === 0){
            setmyS(myS+1);
            buscar();
        }
    }

    const build = (go) =>{
        if (go) {
            dados.pop();
            return <div>
                <Barra />
                <Controles estilo={{marginTop: `${window.innerHeight - 55}px`,marginLeft: `${window.innerWidth < 700 ? 0 : ((window.innerWidth/2)-350)}px`}}/>
                <SubHeader />
                <div className="background_image" style={{backgroundImage: `url(${Globais.image})`}}>
                        <div className="fosco">
                
                <section className="subcenter">
                    <div className="colRow">
                        <div className="quadro" style={{backgroundImage: `url(${Globais.image})`}}></div>
                        <div className="joinTwo">
                            <div className="mgtop">
                                <h2 className="nomeprincipal">{Globais.nome}</h2>
                            </div>
                            <div className="alignLink">
                                <a href={dados[0][2][1]} target="_blank" rel="noreferrer" className="link_leitura">
                                    <div className="div_leitura">
                                        <div className="icone_leitura"></div>
                                        <p>ler agora!</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="leftalign">
                    <p className="retirado">fonte: </p>
                    </div>
                    <div className="sinopse"><p>{dados[0][0]}</p></div>
                </section>
                
                        </div>
                    </div>
            </div>
        }else{
            obter();
            
        }
    }

    return(
        <>
        {/*build(ready)*/obter()}        
        </>
    )
}