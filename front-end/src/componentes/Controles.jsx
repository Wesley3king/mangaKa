import React from "react";

export default class Controles extends React.Component {

    render () {
        return (
            <>
             <div className="limit">
                 <div className="controlesBaixo" style={{marginTop: `${window.innerHeight - 55}px`,marginLeft: `${window.innerWidth < 700 ? 0 : ((window.innerWidth/2)-350)}px`}}>
                     <div className="blibio"></div>
                     <div className="goHome"></div>
                     <div className="return"></div>
                 </div>
             </div>
            </>
        )
    }
}