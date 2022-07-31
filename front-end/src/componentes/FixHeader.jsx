import React from "react";
import { Link } from "react-router-dom";
import { VscMenu ,VscArrowLeft } from "react-icons/vsc";

export default class FixHeader extends React.Component {

    preparar (url) {
        //console.log(url);
        if (url) {
            let corte = url.split('manga/');
            return <Link to={`/manga?n=${corte[1]}`}><VscArrowLeft className="return"/></Link>;
        }else {
            return <VscArrowLeft className="return" onClick={()=> window.history.back()}/>
        }
    }

    render () {
        return (
            <>
            <header style={{marginTop:"0",position:"relative"}} className="header">
                <VscMenu className="bt_menu" onClick={()=> {
                let menu = window.document.querySelector('.barra_menu');
                menu.classList.toggle("ativa");
                }}/>
                <div className="menu_icone">mangaKa</div>
                
                {this.preparar(this.props.link)}
            </header>
            </>
        )
    }
}