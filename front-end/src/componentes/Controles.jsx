import React from "react";
import {Link} from 'react-router-dom';

export default class Controles extends React.Component {

    render () {
        return (
            <>
             <div className="limit">
                 <div className="controlesBaixo" style={{marginTop: `${window.innerHeight - 125}px`,marginLeft: `${window.innerWidth < 700 ? 0 : ((window.innerWidth/2)-350)}px`}}>
                     <div className="blibio"></div>
                     <Link to="/"><div className="goHome"></div></Link>
                     <div className="return"></div>
                 </div>
             </div>
            </>
        )
    }
}