import React from "react";
import { Link } from "react-router-dom";
import { VscMenu } from "react-icons/vsc";

export default class Header extends React.Component {
    render () {
        return (
            <>
            <header className="header">
            <VscMenu onClick={()=> {
    let menu = window.document.querySelector('.barra_menu');menu.classList.toggle("ativa");}} className="bt_menu"/>
                <div className="menu_icone">mangaKa</div>
                <Link to="/pesquisar"><div className="bt_search"></div></Link>
            </header>
            </>
        )
    }
}