import React,{useState} from "react";
import Header from "./componentes/Header";
import Barra from "./componentes/Barra";
import Controles from "./componentes/Controles";


function App() {
  var dados;
  const solicitar = () =>{
    fetch('http://localhost:5000/')
    .then(res => res.json())
    .then(data => dados = data)
    .catch(e => console.log(e));
    console.log(dados);
  }
return (
    <div className="App">
      <Barra />
      <Header />

      <Controles />
      {solicitar()}
    </div>
  );
}

export default App;
