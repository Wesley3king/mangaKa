import React from "react";
import { VscMenu ,VscArrowLeft } from "react-icons/vsc";

export default class FixHeader extends React.Component {
    render () {
        return (
            <>
            <header style={{marginTop:"0",position:"relative"}} className="header">
                <VscMenu className="bt_menu" onClick={()=> {
    let menu = window.document.querySelector('.barra_menu');
    menu.classList.toggle("ativa");
  }}/>
                <div className="menu_icone">mangaKa</div>
                <VscArrowLeft className="return" onClick={()=> window.history.back()}/>
            </header>
            </>
        )
    }
}