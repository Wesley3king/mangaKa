import React from 'react';
import {Link} from'react-router-dom';
import Globais from '../Globais';

export default class Centro extends React.Component {

    montar () {
        //console.log(this.props.info)
        let li = this.props.select.map(item=> <Link to={`./manga?n=${item[0]}`} style={{textDecoration:"none"}} onClick={()=> {Globais.link = item[2]; Globais.nome = item[0]; Globais.image = item[1]}}>
            <li className='espaco'>
                <div className="show" style={{backgroundImage : `url(${item[1]}`}}></div>
                <p className='lettershow'>{item[0]}</p>
                </li></Link>);
        return li;

    }

    render () {
        return (
            <>
             <div className='firstlist'>
                 <h2>{this.props.frase}</h2>
                 <nav>
                 <ul className='listflex'>
                    {this.montar()}
                 </ul>
                 </nav>
             </div>
            </>
        )
    }
}