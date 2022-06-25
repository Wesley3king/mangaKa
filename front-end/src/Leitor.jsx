import React from "react";
import { Link } from "react-router-dom";
import Falselist from "./componentes/Falselist";
import Barra from "./componentes/Barra";
import { VscFoldUp, VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import FixHeader from "./componentes/FixHeader";
import Globais from "./Globais";


export default class leitor extends React.Component {
    constructor (props){
        super (props);
        this.state = {
            ready: false,
            myS: 0,
            tamanhoOrigin: true
        };
        this.dados = [];
        this.allData = {};
        this.indice = 0;
    }

    buscar = async (myParam)=>{
        await fetch(`http://127.0.0.1:5000/manga`,{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"url": `https://mangayabu.top/manga/${myParam}`})
            })
        .then(res => res.json())
        .then(data => {
            this.dados = data.data;
            console.log("dados : ",this.dados);
        }).catch(e=> {console.log(e);this.setState(()=>({myS: 0}));});
    }
    
    obter = async ()=>{
        let urlParams = window.location.hash;
        let myParam = urlParams.split('=');
        let myNum = myParam[1].split("&");
        console.log(myParam,myNum);
        let fazer_requisicao = false;

        for (let i in Globais["dados_armazenados"]) {
            if (Globais["dados_armazenados"][i]["data"]["link"] === `https://mangayabu.top/manga/${myParam[2]}`) {
                console.log("encontado !");
                this.allData = Globais["dados_armazenados"][i]["data"];
                fazer_requisicao = true;
                break;
            }
        }

        if (!fazer_requisicao) {
            if (this.state.myS === 0){
                this.setState((state)=>({myS: state.myS+1}));
                console.log("não encontardo fazendo a requisição");
                await this.buscar();
            }
        }

        //já tendo os dados
        let allCaps = this.allData["capitulos"];
        //console.log(myNum[0])
        for (let i in allCaps) {
            if (allCaps[i][1] === myNum[0]) {
                this.dados = allCaps[i];
                this.indice = i;
                console.log(this.dados);
                this.setState(()=>({ready: true}));
                break;
            }
        }
    }

    buildFooter = () => {
        let allCaps = this.allData["capitulos"];

        let next = allCaps[++this.indice][1];
        let prev = allCaps[--this.indice][1];

        return <>
        <div className="lis_tags">
            <Link to={`/manga/leitor?n=${prev}&l=${txt[1]}`}>
                <p>anterior</p>
                <VscChevronLeft className="prev"/>
            </Link>
        </div>
        <div className="lis_tags" onClick={()=> window.scrollTo(0, 0)}>
            <VscFoldUp className="toTop"/>
        </div>
        <div className="lis_tags">
            <Link to={`/manga/leitor?n=${next}&l=${txt[1]}`}>
                <VscChevronRight className="next"/>
                <p>próximo</p>
            </Link>
        </div>
        </>
    }

    componentDidMount () {
        this.obter();

        //ajusta o tamanho das imagems
        this.interval = setInterval(()=>{
            if(this.state.tamanhoOrigin) {
            let imgs = window.document.querySelectorAll(".capitulo_img");
        let width = window.innerWidth;
        if (imgs.length !== 0){
            //this.stop_int();
            console.log(imgs)
           for(let e of imgs) {
               console.log(e)
               let w = e.clientWidth;
               let h = e.clientHeight;
               //e.setAttribute("width", `${width}px`);
               //e.setAttribute("height",`${((h*width)/w)}px`);
               console.log(`w : ${w} / h : ${h} / width : ${width} / height : ${((h*width)/w)}`);
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

   componentWillUnmount() {
    clearInterval(this.interval);
}
    build () {

        if (this.state.ready) {


            return <>
                   
                    <div>
                        <div className="informaçoes">
                            <div style={{backgroundImage: `url(${this.dados[3]})`}}className="info_img"></div>
                            <div className="flex_column_leitor">
                                <h2 className="titulo_leitor_manga">{this.dados[2]}</h2>
                                <div className="scroll_leitor_sinopse">
                                    <div className="sinopse">
                                        <p>Sinopse : {this.allData["sinopse"]}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="leitor_area">
                            {this.dados[4].map(str=> <img className="capitulo_img" src={str} alt="imagem capitulo"></img>)}
                        </div>

                        <div className="leitor_footer">
                            <div className="control_leitor_footer">
                                {this.buildFooter()}
                            </div>
                            <p className="bigfooter">mangaKa</p>
                        </div>
                    </div>
                   </>
        }else{
            return <>
                    <Falselist estilo_gradient={{height:"150px"}}/>

                    <Falselist estilo_gradient={{height:"88vh"}}/>

                    <Falselist estilo_gradient={{height:"160px"}}/>
                  </>
        }
    }
    render () {
        return (
            <>
             <Barra />
            <FixHeader />
             {this.build()}
            </>
        )
    }
}