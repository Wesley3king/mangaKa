import React from "react";

export default class Barra extends React.Component {


    render () {
        return (
            <div className="barra_menu">
            <div className="close"></div>
            <h1>mangaKa</h1>

            <ul>
                <li>
                    <div className="fav"></div>
                    <p>Favoritos</p>
                </li>
                <li>
                    <div className="cat"></div>
                    <p>Categorias</p>
                </li>
                <li>
                    <div className="down"></div>
                    <p>Downloads</p>
                </li>
                <li>
                    <div className="coming"></div>
                    <p>Em Breve</p>
                </li>
                <li>
                    <div className="conf"></div>
                    <p>Configurações</p>
                </li>
                <li>
                    <div className="hom"></div>
                    <p>Home</p>
                </li>
                <li>
                    <div className="out"></div>
                    <p>Sair</p>
                </li>
            </ul>
            </div>
        )
    }
}