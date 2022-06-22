import React from "react";
import Header from "./componentes/Header";
import Barra from "./componentes/Barra";
import Controles from "./componentes/Controles";
import Listas from "./componentes/Listas";
import Footer from "./componentes/Footer";
import Falselist from "./componentes/Falselist";
import Globais from "./Globais";

export default class Main extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {
            ready: false,
            tempo: 100
        };
        this.dados_lacamentos = null;
        this.dados_popular = null;
        this.dados_atualizados = null;
        this.destaques = null;
        
        this.foto = 1;
        this.intervalo = null;
    }

    componentDidMount () {
            if (this.state.ready === false){
                console.log(`teste de fetch : ${""}`)
                if (Globais["dados_atualizados"]["deafult"] === false) {
                    console.log('"realizando o fetch')
                    fetch('http://127.0.0.1:5000')
                    .then(res => res.json())
                    .then(data => {
                        //0 - favoritos , 1 - lista favoritos ,2 - destaques, 3 - number fav list, 4 - mais lidos
                        //this.dados.push(data.favoritos);
                        this.dados_atualizados = data.atualizados;
                        this.dados_lancamentos = data.lancamentos;
                        this.dados_popular = data.popular;

                        Globais["dados_atualizados"] = data.atualizados;
                        Globais["dados_lancamentos"] = data.lancamentos;
                        Globais["dados_popular"] = data.popular;

                        this.setState({ready: true});
                    }).catch(e => console.log("erro aqui : "+e));

                    //destaques
                    fetch("http://127.0.0.1:5000/destaques")
                    .then(res => res.json())
                    .then(data =>{
                        this.destaques = data;
                        Globais["destaques"] = data;
                    });
                    
                }else{
                    this.dados_atualizados = Globais["dados_atualizados"];
                    this.dados_lancamentos = Globais["dados_lancamentos"];
                    this.dados_popular = Globais["dados_popular"];
                    this.destaques = Globais["destaques"];
                    
                    this.setState({ready: true});
                }
            }

            this.intervalo = setInterval(()=>{
                
                let e = window.document.querySelectorAll('.select');
                  if (this.state.tempo === 100) this.setState({tempo:6000});
                  console.log(`valor : ${this.state.tempo} | teste : ${this.state.tempo === 100} | `)
                        if (e[4] !== undefined){
                            for(let i of e){i.style.display = "none"};
                            e[this.foto].style.display = "block";
                            }
                            console.log(this.foto)
                            this.foto++;
                    if(this.foto === 8) this.foto = 0;
            },6000);

       
    }

    componentWillUnmount() {
        clearInterval(this.intervalo);
    }
    desataques () {
        if (this.state.ready) {
            let li = [];
            //console.log("dest : ", this.destaques[0]);
            let iter = Object.keys(this.destaques);

            for (let e of iter){
            //console.log(this.destaques[0][e]);
                li.push(<li className="select" style={{display: e === "numero1" ?"block" : "none",backgroundColor:`${this.destaques[e].color}`}}>
                <div key={`destaque${this.destaques[e].poster}`} className="mainImagem" style={{backgroundImage: `url(https://wesley3king.github.io/mangaKa/frontCapas/${this.destaques[e].poster})`}}></div>
                </li>);
                
            }
            return <ul> {li} </ul>;
        }
    }
    
    machine () {
        if (this.state.ready){
            return <div> 
            <section>
              <div className='areaVisual'>
              {this.desataques()}
              </div>
              <Listas select={this.dados_lancamentos} frase="lancamentos"/>
              <Listas select={this.dados_popular} frase="popular"/>
              <Listas select={this.dados_atualizados} frase="atualizados" />
              <Footer />
            </section>
            </div>
          }else{
              return <>
              <div> 
            <section>
              <div className='areaVisual'>
              <Falselist estilo_gradient={{height:"150px"}}/>
              </div>
              <Falselist frase="lancamentos"/>
              <Falselist frase="popular"/>
              <Falselist frase="atualizados" />
              <Footer />
            </section>
            </div>
              </>
          }
    }

    render () {
        return (
            <>
            <Barra estilo={{marginTop:"-70px"}}/>
            <Controles estilo={{marginTop: `${window.innerHeight - 125}px`,marginLeft: `${window.innerWidth < 700 ? 0 : ((window.innerWidth/2)-350)}px`}}/>
            <Header />
            {this.machine()}
            </>
        )
    }
}