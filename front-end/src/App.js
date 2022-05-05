import React,{useEffect, useState} from "react";
import Header from "./componentes/Header";
import Barra from "./componentes/Barra";
import Controles from "./componentes/Controles";
import Centro from "./componentes/Centro";
import img from'./frontCapas/spy-family.webp';


function App() {
  var dados = [];
  const [foto,setFoto] = useState(0);
  useEffect(()=>{
    let time = setInterval(()=>{
        setFoto(foto+1);
        let e = window.document.querySelector('.mainImagem')
        console.log(e)
        //e.style.background =`./frontCapas/${dados[2][`numero${foto}`].poster}`;
        e.style.background = img;
        console.log(dados[2][`numero${foto}`].poster);
    },6000);
    if(foto === 9) {
      setFoto(0);
    }
    return ()=> clearInterval(time);
  },[foto,dados])
  
  const solicitar = () =>{
    fetch('http://127.0.0.1:5000')
    .then(res => res.json())
    .then(data => {
      dados.push(data.favoritos);
      dados.push(data.lista);
      dados.push(data.destaques);

      console.log(data);
    })
    .catch(e => console.log(e));
    console.log(dados);
  }
return (
    <div className="App">
      
      <Barra />
      <Controles />
      <Header />
      <section>
        <Centro />
        <div className='areaVisual'>
                 <div className="mainImagem"></div>
        </div>
      </section>

      {solicitar()}
    </div>
  );
}

export default App;
