import React from "react";
import Falselist from "./componentes/Falselist";
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
        //faz a requisição
        if (this.state.myS === 0){
            this.setState((state)=>({myS: state.myS+1}));
            this.buscar();
        }

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

                        <div className="leitor_footer">
                            <div className="control_leitor_footer">
                                <div className="lis_tags">
                                    <p>anterior</p>
                                    <div className="prev"></div>
                                </div>
                                <div className="lis_tags">
                                    <div className="next"></div>
                                    <p>próximo</p>
                                </div>
                            </div>
                            <p className="bigfooter">mangaKa</p>
                        </div>
                    </div>
                   </>
        }else{
            return <>
                    <Falselist estilo_gradient={{height:"150px"}}/>

                    <Falselist estilo_gradient={{height:"92vh"}}/>
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