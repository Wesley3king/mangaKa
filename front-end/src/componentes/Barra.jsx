import React from "react";

export default class Barra extends React.Component {


    render () {
        return (
            <div className="barra_menu">
            <div className="mm_center">
                <div className="close"  onClick={()=> {
    let menu = window.document.querySelector('.barra_menu');
    menu.classList.toggle("ativa"); console.log("ddddd");
  }}></div>
                <h1>mangaKa</h1>
            </div>

            <ul>
                <li className="emlinha">
                    <div className="fav"></div>
                    <p>Favoritos</p>
                </li>
                <li className="emlinha">
                    <div className="cat"></div>
                    <p>Categorias</p>
                </li>
                <li className="emlinha">
                    <div className="down"></div>
                    <p>Downloads</p>
                </li>
                <li className="emlinha">
                    <div className="coming"></div>
                    <p>Em Breve</p>
                </li>
                <li className="emlinha">
                    <div className="conf"></div>
                    <p>Configurações</p>
                </li>
                <li className="emlinha">
                    <div className="hom"></div>
                    <p>Home</p>
                </li>
                <li className="emlinha">
                    <div className="out"></div>
                    <p>Sair</p>
                </li>
            </ul>
            </div>
        )
    }
}