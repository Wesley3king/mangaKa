import React from "react";
import {Link} from 'react-router-dom';

export default class Controles extends React.Component {

    render () {
        return (
            <>
             <div className="limit">
                 <div className="controlesBaixo" style={this.props.estilo}>
                     <div className="blibio"></div>
                     <Link to="/"><div className="goHome"></div></Link>
                     <div className="return" onClick={()=>window.history.back()}></div>
                 </div>
             </div>
            </>
        )
    }
}