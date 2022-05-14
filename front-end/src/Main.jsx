import React from "react";
import Header from "./componentes/Header";
import Barra from "./componentes/Barra";
import Controles from "./componentes/Controles";
import Listas from "./componentes/Listas";
import Footer from "./componentes/Footer";

export default class Main extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {
            ready: false,
            tempo: 100
        };
        this.dados = [];
        
        this.foto = 0;
        this.intervalo = null;
    }

    componentDidMount () {
            if (this.state.ready === false){
              fetch('http://127.0.0.1:5000')
            .then(res => res.json())
            .then(data => {
              //0 - favoritos , 1 - lista favoritos ,2 - destaques, 3 - number fav list, 4 - mais lidos
              this.dados.push(data.favoritos);
              this.dados.push(data.lista);
              this.dados.push(data.destaques);
              let dt = this.dados[1].map(item => item.cod);
              this.dados.push(dt);
              this.dados.push(data.toplidos);
        
              console.log(data);
              this.setState({ready: true});
            })
            .catch(e => console.log("erro aqui : "+e));
            console.log(this.dados);
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
            for (let e in this.dados[2]){
            console.log(e);
                li.push(<li className="select" style={{display: e === "numero1" ?"block" : "none",backgroundColor:`${this.dados[2][e].color}`}}>
                <div key={`destaque${e}`} className="mainImagem" style={{backgroundImage: `url(https://wesley3king.github.io/mangaKa/frontCapas/${this.dados[2][e].poster})`}}></div>
                </li>);
                
            }
            return <ul> {li} </ul>;
        }
    }
    machine () {
        if (this.state.ready){
            return <div> 
            <Barra estilo={{marginTop:"-70px"}}/>
            <Controles estilo={{marginTop: `${window.innerHeight - 125}px`,marginLeft: `${window.innerWidth < 700 ? 0 : ((window.innerWidth/2)-350)}px`}}/>
            <Header />
            <section>
              <div className='areaVisual'>
                      {this.desataques()}
              </div>
              <Listas select={this.dados[0]} info={this.dados[1]} frase="lendo"/>
              <Listas select={this.dados[3]} info={this.dados[1]} frase="minha lista"/>
              <Listas select={this.dados[4]} info={this.dados[1]} frase="mais lidos" />
              <Footer />
            </section>
            </div>
          }
    }

    render () {
        return (
            <>
            {this.machine()}
            </>
        )
    }
}