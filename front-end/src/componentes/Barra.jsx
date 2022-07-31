import React from "react";
import { Link } from "react-router-dom";
import { CgHeart, CgMenuGridR, CgLogOff } from "react-icons/cg";
import { BsCloudArrowDownFill, BsFillBellFill, BsHouseFill } from "react-icons/bs";
import { RiToolsFill } from "react-icons/ri";
import { VscChromeClose } from "react-icons/vsc";

export default class Barra extends React.Component {


    render () {
        return (
            <div style={this.props.estilo} className="barra_menu">
            <div className="mm_center">
                <VscChromeClose className="close"  onClick={()=> {
    let menu = window.document.querySelector('.barra_menu');
    menu.classList.toggle("ativa"); console.log("ddddd");
  }}/>
                <h1>mangaKa</h1>
            </div>

            <ul>
                <li className="emlinha">
                    <CgHeart className="fav"/>
                    <p>Favoritos</p>
                </li>
                <li className="emlinha">
                    <CgMenuGridR className="cat"/>
                    <p>Categorias</p>
                </li>
                <li className="emlinha">
                    <BsCloudArrowDownFill className="down"/>
                    <p>Downloads</p>
                </li>
                <li className="emlinha">
                    <BsFillBellFill className="coming"/>
                    <p>Em Breve</p>
                </li>
                <li className="emlinha">
                    <RiToolsFill className="conf"/>
                    <p>Configurações</p>
                </li>
                <Link to="/" style={{textDecoration: "none",color:"white"}}><li className="emlinha">
                    <BsHouseFill className="hom"/>
                    <p>Home</p>
                </li></Link>
                <li className="emlinha" onClick={()=> window.close()}>
                    <CgLogOff className="out"/>
                    <p>Sair</p>
                </li>
            </ul>
            </div>
        )
    }
}