import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
    render () {
        return (
            <>
            <header className="header">
                <div className="bt_menu" onClick={()=> {
    let menu = window.document.querySelector('.barra_menu');
    menu.classList.toggle("ativa"); console.log("ddddd");
  }}></div>
                <div className="menu_icone">mangaKa</div>
                <Link to="/pesquisar"><div className="bt_search"></div></Link>
            </header>
            </>
        )
    }
}