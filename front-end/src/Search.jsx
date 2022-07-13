import React from "react";
import HeaderR from "./componentes/HeaderR";
import Barra from "./componentes/Barra";
import {Link} from "react-router-dom"; 
import { VscSearch } from "react-icons/vsc";

import "./index.css";

export default class Search extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            texto: "",
            ready: false,
            enabled: false
        };
        this.dados = {};
        this.urlServer = "";

    }

    async send () {
        console.log(`valor de texto : ${this.state.texto} / para : ${this.urlServer}`);
        this.setState(()=>({ready: false}));
        await fetch(`${this.urlServer}pesquisar`,{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"nome": this.state.texto})
            })
        .then(res => res.json())
        .then(data => {
            this.dados = data;
            console.log("dados : ",this.dados);
            this.setState(()=>({ready: true}));
        }).catch(console.log);
    };

    async getUrlServer () {
        await fetch(`http://127.0.0.1:5000/server`)
        .then(res => res.json())
        .then(data => {
            this.urlServer = data.url;
            console.log("enable");
            this.setState(()=> ({enabled: true}));
        });
    };
    componentDidMount() {
        this.getUrlServer();
    };

    resultadosDisponiveis (dados) {
        console.log(dados);
        if (this.state.ready && dados) {
            if (typeof dados === "object") {
                let txt = dados["link"].split('manga/');
                return <>
                    <div className="div_flex_search">
                    <div className="div_result_search"><Link to={`/manga?n=${txt[1]}`} style={{textDecoration:"none"}}><div className="search_img" style={{backgroundImage: `url(${dados["capa1"]})`}}></div><p className="lettershow2">{dados["nome"]}</p></Link></div>
                    </div>
                   </>
            }else if (typeof dados === "array") {
                console.log(typeof dados);
                return <>
                    <div className="div_flex_search">
                    {dados.map(obj => {
                        let txt = obj["link"].split('manga/');
                    return <div className="div_result_search"><Link to={`/manga?n=${txt[1]}`} style={{textDecoration:"none"}}><div className="search_img" style={{backgroundImage: `url(${obj["img"]})`}}></div><p className="lettershow2">{obj["nome"]}</p></Link></div>})}
                    </div>
                   </>
            }
        };
    };

    resultados (dados) {
        console.log(dados);
        if (this.state.ready && dados) {
            return <>
                    <div className="div_flex_search">
                    {dados.map(arr => {
                    let txt = arr[2].split('manga/');
                    return <div className="div_result_search"><Link to={`/adicionar?n=${txt[1]}`}><div className="search_img" style={{backgroundImage: arr[1]}}></div><p className="lettershow2">{arr[0]}</p></Link></div>})}
                    </div>
                   </>
        };
    };

    build () {
        return <>
                <Barra />
                <HeaderR/>
                <div>
                    <div className="margin_top">

                    </div>
                        <div className="inp_align">
                            <input className="inp_search" type="text" placeholder="digite o nome do manga" value={this.state.texto} onChange={(e)=> this.setState(()=>({texto: e.target.value}))}/>
                            {this.state.enabled ? <div className="active_search_ready" onClick={()=> this.send()}><VscSearch /></div> : <div className="active_search" onClick={()=> this.send()}><VscSearch /></div>}
                        </div>
                    
                </div>
                <div className="serch_flex_align">
                    <div className="result">
                        {this.resultadosDisponiveis(this.dados["dadosExistentes"])}
                    </div>
                    <div className="result">
                        {this.resultados(this.dados["dadosNovos"])}
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