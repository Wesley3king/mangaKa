import React from "react";
import HeaderR from "./componentes/HeaderR";
import Barra from "./componentes/Barra";
import {Link} from "react-router-dom"
import "./index.css";

export default class Search extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            texto: "",
            ready: false
        };
        this.dados = [];

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
            return <>
                    <div className="div_flex_search">
                    {this.dados.map(arr => {
                    let txt = arr[2].split('manga/');
                    return <div className="div_result_search"><Link to={`/manga?n=${txt[1]}`} style={{textDecoration:"none"}}><div className="search_img" style={{backgroundImage: arr[1]}}></div><p className="lettershow2">{arr[0]}</p></Link></div>})}
                    </div>
                   </>
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
                <div className="serch_flex_align">
                    <div className="result">
                        {this.resultados()}
                    </div>
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