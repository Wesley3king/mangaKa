import React,{useState} from "react";
import Header from "./componentes/Header";
import Barra from "./componentes/Barra";
import Controles from "./componentes/Controles";


function App() {

return (
    <div className="App">
      <Barra />
      <Header />

      <Controles />
    </div>
  );
}

export default App;
