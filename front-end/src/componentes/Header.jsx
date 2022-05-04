import React from "react";

export default class Header extends React.Component {
    render () {
        return (
            <>
            <header className="header">
                <div className="bt_menu" onClick={()=> {
    let menu = window.document.querySelector('.barra_menu');
    menu.classList.toggle("ativa"); console.log("ddddd");
  }}></div>
                <div className="menu_icone"></div>
                <div className="bt_search"></div>
            </header>
            </>
        )
    }
}