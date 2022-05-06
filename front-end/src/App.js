import React,{useEffect, useState} from "react";
import Header from "./componentes/Header";
import Barra from "./componentes/Barra";
import Controles from "./componentes/Controles";
import Centro from "./componentes/Centro";

var dados = [];
function App() {
  
  const [foto,setFoto] = useState(0);
  const [ready,setReady] = useState(false);
   let [tt,setTt] = useState(100);
  useEffect(()=>{
    
    let time = setInterval(()=>{
        setFoto(foto+1);
        if (tt !== 6000) setTt(6000);
        let e = window.document.querySelectorAll('.select');
         console.log(foto);
        if (e[4] !== undefined){
        for(let i of e){i.style.display = "none"};
        e[foto].style.display = "block";
        }
    },tt);
    if(foto === 8) {
      setFoto(0);
    }
    return ()=> clearInterval(time);
  },[foto,tt]);
  
  const solicitar = () =>{
    if (dados[2] === undefined){
      fetch('http://127.0.0.1:5000')
    .then(res => res.json())
    .then(data => {
      dados.push(data.favoritos);
      dados.push(data.lista);
      dados.push(data.destaques);

      console.log(data);
      setReady(true);
    })
    .catch(e => console.log(e));
    console.log(dados);
    }
  }

  //cria a lista de destaque
  const criarDestaque = ()=>{
    if (dados[2] !== undefined) {
      let li = [];
    for (let e in dados[2]){
      
        li.push(<li className="select" style={{display: "none",backgroundColor:`${dados[2][e].color}`}}>
          <div key={`destaque${e}`} className="mainImagem" style={{backgroundImage: `url(https://wesley3king.github.io/mangaKa/frontCapas/${dados[2][e].poster})`}}></div>
          </li>);
        
    };
    return <ul>{li}</ul>;
    }
  }


  const motor = ()=> {
    solicitar();

    if (ready){
    return <> 
    <Barra />
    <Controles />
    <Header />
    <section>
      <Centro />
      <div className='areaVisual'>
              {criarDestaque()}
      </div>
    </section>
    </>
  }}

return (
    <div className="App">
      {motor()}
    </div>
  );
}

export default App;
