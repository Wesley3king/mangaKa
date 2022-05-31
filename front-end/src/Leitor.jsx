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
    }
    buscar = async ()=>{
        let urlParams = window.location.hash;
        let myParam = urlParams.split('=');
        console.log(myParam);
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
        let width = window.innerWidth;
        let imgA = [];
        for (let c of arr) {
            let img = new Image();
            let t = [];
           // let h = NaN;
         img.onload = function () {
             console.log(`width: ${this.width} - height: ${this.height}`);
             t.push(Number(`${this.width}`));
             t.push(Number(`${this.height}`));
             let h = ((t[1]*width)/t[0]);
         //console.log(h,  typeof t[0]);

         imgA.push(<li><div style={{width: this.width, height: h, backgroundImage: `url(${c})`}}></div></li>)
         }
 
         img.src = c;
     }
     console.log(imgA)
     return <div><ul>{imgA}</ul></div>;
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
                            {this.imagem(this.dados[3])}
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