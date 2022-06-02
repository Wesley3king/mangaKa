import React from "react";

export default class Falselist extends React.Component {


    render () {
        return (<>
                    <div className='firstlist' style={this.props.estilo}>
                        <h2>{this.props.frase}</h2>
                        <div className="loading_gradient" style={this.props.estilo_gradient}></div>
                    </div>
                
               </>)
    }
}