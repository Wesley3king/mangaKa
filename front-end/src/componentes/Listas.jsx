import React from 'react';
import {Link} from'react-router-dom';

export default class Centro extends React.Component {

    montar () {
        //console.log(this.props.info)
        let li = this.props.select.map(item=> <Link to={`./manga?n=${this.props.info[item].cod}`} style={{textDecoration:"none"}}>
            <li className='espaco'>
                <div className="show" style={{backgroundImage : `url(https://wesley3king.github.io/mangaKa/capas/${this.props.info[item].img})`}}></div>
                <p className='lettershow'>{this.props.info[item].shortNAME}</p>
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