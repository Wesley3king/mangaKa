import React from "react";

export default class FixHeader extends React.Component {
    render () {
        return (
            <>
            <header style={{marginTop:"0"}} className="header">
                <div className="bt_menu" onClick={()=> {
    let menu = window.document.querySelector('.barra_menu');
    menu.classList.toggle("ativa");
  }}></div>
                <div className="menu_icone">mangaKa</div>
                <div className="return"></div>
            </header>
            </>
        )
    }
}