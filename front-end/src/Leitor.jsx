import React from "react";
//import Controles from "./componentes/Controles";
import Barra from "./componentes/Barra";
import FixHeader from "./componentes/FixHeader";

export default class leitor extends React.Component {
    constructor (props){
        super (props);
        this.state = {
            ready: false,
            myS: 0
        };
        this.dados = [];
        this.intervalo = null;
        this.mont = false;
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

     imagem (arr) {
        
    }

    componentDidMount () {
        if (!this.mont){
            this.intervalo = setInterval(()=>{
                let width = window.innerWidth;
            let local = document.querySelector(".leitor_area");

            if (local) {
            for (let c of this.dados[3]) {
                const img = new Image();
                img.onload = function() {
                    let div_img = document.createElement("div");
                    /*div_img.style.width = width;
                    div_img.style.height =  ((this.height*width)/this.width);
                    console.log(`height : ${((this.height*width)/this.width)}`);
                    div_img.style.backgroundImage = `url(${c})`;*/
                    div_img.setAttribute("src", c);
                    div_img.setAttribute("width",width);
                    div_img.setAttribute("height",((this.height*width)/this.width));

                    local.appendChild(div_img);
                }
                img.src = c;
            }
            this.mont = true;
            }
            },500);
    }
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