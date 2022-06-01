import React from "react";
import HeaderR from "./componentes/HeaderR";
import Barra from "./componentes/Barra";
import "./index.css";

export default class Search extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            texto: "",
            ready: false
        };

    }

    async send () {
        console.log(`valor de texto : ${this.state.texto}`);
        this.setState(()=>({ready: false}));
        await fetch(`http://127.0.0.1:5000/pesquisar`,{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"nome": this.state.texto})
            })
        .then(res => res.json())
        .then(data => {
            this.dados = data.data;
            console.log("dados : ",this.dados);
            this.setState(()=>({ready: true}));
        })
    }
    resultados () {
        if (this.state.ready) {
            
        }
    }

    build () {
        return <>
                <Barra />
                <HeaderR/>
                <div>
                    <div className="margin_top">

                    </div>
                        <div className="inp_align">
                            <input className="inp_search" type="text" placeholder="digite o nome do manga" value={this.state.texto} onChange={(e)=> this.setState(()=>({texto: e.target.value}))}/>
                            <div className="active_search" onClick={()=> this.send()}></div>
                        </div>
                    
                </div>
                <div className="result">
                    {this.resultados()}
                </div>
               </>
    }

    render () {
        return (
        <>
         {this.build()}
        </>
        )
    }
}