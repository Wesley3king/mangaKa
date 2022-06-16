import React from "react";
import {Link} from 'react-router-dom';
import { BsHouseFill } from "react-icons/bs";
import { VscArrowLeft } from "react-icons/vsc";
import { CgMenuGridR } from "react-icons/cg";

export default class Controles extends React.Component {

    render () {
        return (
            <>
             <div className="limit">
                 <div className="controlesBaixo" style={this.props.estilo}>
                     <CgMenuGridR className="blibio" style={{marginLeft:"2%"}}/>
                     <Link to="/"><BsHouseFill className="goHome"/></Link>
                     <VscArrowLeft className="return" onClick={()=>window.history.back()} style={{marginRight:"2%"}}/>
                 </div>
             </div>
            </>
        )
    }
}