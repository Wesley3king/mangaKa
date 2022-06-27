import React from 'react';
import {Link} from'react-router-dom';
import Globais from '../Globais';

export default class Centro extends React.Component {

    montar () {
        //console.log(this.props.info)
        let txt = this.props.select.map(item => item["url"].split("manga/"));
        let li = this.props.select.map((item,ind)=> <Link to={`./manga?n=${txt[ind][1]}`} style={{textDecoration:"none"}} >
            <li className='espaco'>
                <div className="show" style={{backgroundImage : `url(${item["img"]}`}}></div>
                <p className='lettershow'>{item["nome"]}</p>
                </li></Link>);
        return li;

    }
//onClick={()=> {Globais.link = item[2]; Globais.nome = item[0]; Globais.image = item[1]}}
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