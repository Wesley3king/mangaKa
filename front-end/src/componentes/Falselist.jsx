import React from "react";

export default class Falselist extends React.Component {


    render () {
        return (<>
                    <div className='firstlist'>
                        <h2>{this.props.frase}</h2>
                        <div className="loading_gradient"></div>
                    </div>
                
               </>)
    }
}