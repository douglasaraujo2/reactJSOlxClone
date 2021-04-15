import React from 'react';
import { Item } from './styles';
import { Link } from 'react-router-dom';

const Page = (props) => {
    let price = '';

    if (props.data.priceNegotiable) {
        price = 'Preço Negociável'
    } else {
        price = Number(props.data.price).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' });
    }
    return (
        <Item className="itemAd">
            <Link to={`/ad/${props.data.id}`}>
                <div className="itemImage">
                    <img src={props.data.image} alt="" />
                </div>
                <div className="itemName">
                    {props.data.title}
                </div>
                <div className="itemPrice">{price}</div>
            </Link>
        </Item>
    )
}

export default Page;