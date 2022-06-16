import React from "react";
import { VscMenu } from "react-icons/vsc";
import { VscArrowLeft } from "react-icons/vsc";

export default class Header extends React.Component {
    render () {
        return (
            <>
            <header style={{marginTop:"0"}} className="header">
                <VscMenu className="bt_menu" onClick={()=> {
    let menu = window.document.querySelector('.barra_menu');
    menu.classList.toggle("ativa");
  }}/>
                <div className="menu_icone">mangaKa</div>
                <VscArrowLeft style={{color:"white",fontSize:"3em",marginRight:"1vw"}}/>
            </header>
            </>
        )
    }
}