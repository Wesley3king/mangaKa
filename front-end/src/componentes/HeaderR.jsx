import React from "react";
import { Link } from "react-router-dom";
import { VscArrowLeft, VscMenu } from "react-icons/vsc";

export default class FixHeader extends React.Component {
    render () {
        return (
            <>
            <header style={{marginTop:"0"}} className="header">
                <div className="bt_menu" onClick={()=> {
    let menu = window.document.querySelector('.barra_menu');
    menu.classList.toggle("ativa");
  }}> <VscMenu /></div>
                <div className="menu_icone">mangaKa</div>
                <Link to="/"><VscArrowLeft className="return"/></Link>
            </header>
            </>
        )
    }
}