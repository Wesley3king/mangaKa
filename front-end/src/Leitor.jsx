import React from "react";
//import Controles from "./componentes/Controles";
import Barra from "./componentes/Barra";
import FixHeader from "./componentes/FixHeader";


export default class leitor extends React.Component {
    constructor (props){
        super (props);
        this.state = {
            ready: false,
            myS: 0,
            tamanhoOrigin: true
        };
        this.dados = [];
    }
    buscar = async ()=>{
        let urlParams = window.location.hash;
        let myParam = urlParams.split('=');
        //console.log(myParam);
        await fetch(`http://127.0.0.1:5000/manga/leitor`,{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"url": `https://mangayabu.top/?p=${myParam[1]}`})
            })
        .then(res => res.json())
        .then(data => {
            this.dados = data.data;
            console.log("dados : ",this.dados);
            this.setState(()=>({ready: true}));
        }).catch(e=> {console.log(e);this.setState(()=>({myS: 0}));});
    }
    obter = ()=>{
        if (this.state.myS === 0){
            this.setState((state)=>({myS: state.myS+1}));
            this.buscar();
        }
    }


    componentDidMount () {

        this.interval = setInterval(()=>{
            if(this.state.tamanhoOrigin) {
            let imgs = window.document.querySelectorAll(".capitulo_img");
        let width = window.innerHeight;
        if (imgs.length !== 0){
            //this.stop_int();
            console.log(imgs)
           for(let e of imgs) {
               console.log(e)
               let w = e.naturalWidth;
               let h = e.naturalHeight;
               console.log(`h : ${h} // w : ${w}`)
               //e.setAttribute("width", `${width}px`);
               //e.setAttribute("height",`${((h*width)/w)}px`);
               e.style.width = `${width}px`;
               e.style.height = `${((h*width)/w)}px`;
           };
           this.setState(()=>({tamanhoOrigin: false}));
        }else{
            console.log("nada no array",imgs);
        }
       }
    },4000);    
   }

   stop_int () {
    clearInterval(this.interval);
    console.log("clearInterval parado");
}
    build () {

        if (this.state.ready) {


            return <>
                    <Barra />
                <FixHeader />
                    <div>
                        <div className="informaçoes">
                            <div style={{backgroundImage: `url(${this.dados[1]})`}}className="info_img"></div>
                            <div className="flex_column_leitor">
                                <h2 className="titulo_leitor_manga">{this.dados[0]}</h2>
                                <div className="scroll_leitor_sinopse">
                                    <div className="sinopse">
                                        <p>Sinopse : {this.dados[2]}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="leitor_area">
                            {this.dados[3].map(str=> <img className="capitulo_img" src={str} alt="imagem capitulo"></img>)}
                        </div>
                    </div>
                   </>
        }else{
            this.obter();
        }
    }
    render () {
        return (
            <>
             {this.build()}
            </>
        )
    }
}