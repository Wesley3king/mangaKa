import React,{useState} from "react";
import SubHeader from "./componentes/SubHeader";
import Barra from "./componentes/Barra";
import Controles from "./componentes/Controles";
//import Globais from "./Globais";
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
        let urlParams = window.location.hash;
        let myParam = urlParams.split('=');
        console.log(myParam);
        await fetch(`http://127.0.0.1:5000/manga`,{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"url": `https://mangayabu.top/manga/${myParam[1]}`})
            })
        .then(res => res.json())
        .then(data => {
            dados = data.data;
            console.log("dados : ",dados);
            setReady(true);
        }).catch(e=> {console.log(e);setmyS(0)});
    }
    const obter = ()=>{
        if (myS === 0){
            setmyS(myS+1);
            buscar();
        }
    }

    const tags = (arr)=>{
        let li = arr.map(str => <li>{str}</li>);
        return <ul className="lis_tags">{li}</ul>;
    }
    const capit = (arr)=>{
        let li = arr.map(array => <li className="all_caps">{array[0].replace("#","")}</li>);

        return <div><ul>{li}</ul></div>;
    }
    const showCapitulos = ()=>{
        let ds = window.document.querySelector(".all_space");
        if (ds !== undefined && ds !== null) ds.classList.toggle("ocult");

    }
    const build = (go) =>{
        if (go) {
            console.log(dados[1]);
            return <div>
                <Barra />
                <Controles estilo={{marginTop: `${window.innerHeight - 55}px`,marginLeft: `${window.innerWidth < 700 ? 0 : ((window.innerWidth/2)-350)}px`}}/>
                <SubHeader />
                
                    <div className="all_space">
                        <div className="lista_de_capitulos">
                        <div className="close2"  onClick={()=> showCapitulos()}></div>
                                    <div className="scroll_y_list">{capit(dados[2])}</div>
                                </div>
                    </div>
                <div className="background_image" style={{backgroundImage: `url(${dados[4]})`}}>
                        <div className="fosco">
                
                <section className="subcenter">
                
                    <div className="colRow">
                        
                        <div className="quadro" style={{backgroundImage: `url(${dados[4]})`}}></div>
                        <div className="joinTwo">
                            <div className="mgtop">
                                <h2 className="nomeprincipal">{dados[3]}</h2>
                            </div>
                            <div className="alignLink">
                                    <div className="div_leitura" onClick={()=>showCapitulos()}>
                                        <div className="icone_leitura"></div>
                                        <p>ler agora!</p>
                                    </div>
                            </div>
                        </div>
                    </div>

                    <div className="leftalign">
                    <p className="retirado">{tags(dados[1])}</p>
                    </div>
                    <div className="sinopse"><p>{dados[0]}</p></div>
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
        {build(ready)}        
        </>
    )
}