import React from "react";
import Header from "./componentes/Header";
import Barra from "./componentes/Barra";
import Controles from "./componentes/Controles";
import Listas from "./componentes/Listas";
import ListaFav from "./componentes/ListaFav";
import Footer from "./componentes/Footer";
import Falselist from "./componentes/Falselist";
import Globais from "./Globais";
import login from "./Functions";

export default class Main extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {
            ready: false,
            tempo: 100,
            foto: 0,
            fav : false
        };
        this.dados_lacamentos = null;
        this.dados_popular = null;
        this.dados_atualizados = null;
        this.destaques = null;
        
        this.intervalo = null;
    }
    async logar () {
        /*const user_fetch= async (email, senha) => {
            let response = await fetch(`http://127.0.0.1:5000/login`,{
                 method: 'POST',
                 headers: {"Content-Type": "application/json"},
                 body: JSON.stringify({"mail": email, "password": senha})
                 })
             .then(d => d.json())
             .catch(console.log);
         
             return response;
         }
        const login = async (data = null) => {
            if (!data) {
                let str_ls_mail = localStorage.getItem("mangaka_user_mail");
                let str_ls_pass = localStorage.getItem("mangaka_user_password");
                console.log(str_ls_mail);
                let response = await user_fetch(str_ls_mail, str_ls_pass);
        
                Globais.user = response;
                Globais.log = response ? true : false;
        
                return response;
        
            }else{
                localStorage.setItem("mangaka_user_mail", data.mail);
                localStorage.setItem("mangaka_user_password", data.pass);
        
                let response = await user_fetch(data.mail, data.pass);
        
                Globais.user = response;
                Globais.log = response ? true : false;
        
                return response;
            }
        }*/
        let res = await login({mail: "moraeswesley290@gmail.com", pass: "mangaka#1"});
        //this.setState(state => ({fav: res[""]}))

    }
    componentDidMount () {
            if (this.state.ready === false){
                console.log(`teste de fetch : ${""}`)
                if (Globais["dados_atualizados"]["deafult"] === false) {
                    console.log('"realizando o fetch')
                    fetch('https://server-heroku-deploy.herokuapp.com/')
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
                        console.log(data);
                        this.setState({ready: true});
                    }).catch(e => console.log("erro aqui : "+e));

                    //destaques
                    fetch("https://server-heroku-deploy.herokuapp.com/destaques")
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
                //login
                this.logar();
            }

            this.intervalo = setInterval(()=>{
                    this.setState((state)=> ({foto: state.foto+1}));
                    if(this.state.foto === 7) this.setState((state)=> ({foto: 0}));
                    //this.fav = Globais.log;
            },6000);

       
    }

    componentWillUnmount() {
        clearInterval(this.intervalo);
    }
    desataques (num) {
        if (this.state.ready) {
            //console.log("dest : ", this.destaques[0]);
            let iter = Object.keys(this.destaques);

            
            return <div className="select" style={{backgroundColor:`${this.destaques[iter[num]].color}`}}>
            <div key={`destaque${this.destaques[iter[num]].poster}`} className="mainImagem" style={{backgroundImage: `url(https://wesley3king.github.io/mangaKa/frontCapas/${this.destaques[iter[num]].poster})`}}></div>
            </div>;
        }
    }
    
    machine () {
        if (this.state.ready){
            return <div> 
            <section>
              <div className='areaVisual'>
              {this.desataques(this.state.foto)}
              </div>
              {Globais.log ? <ListaFav select={Globais.user["favoritos"]} frase="favoritos"/> : ""}
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