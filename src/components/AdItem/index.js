import React, { useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { Item } from "./styles";
import { Link } from "react-router-dom";
import AdEditModal from "../AdEditModal";

const Page = (props) => {
  let price = "";
  if (props.data.priceNegotiable) {
    price = "Preço Negociável";
  } else {
    price = Number(props.data.price).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
  return (
    <Item className="itemAd">
      {!props.isEditable && (
        <Link to={`/ad/${props.data.id}`}>
          <div className="itemImage">
            <img src={props.data.image} alt="" />
          </div>
          <div className="itemName">{props.data.title}</div>
          <div className="itemPrice">{price}</div>
        </Link>
      )}
      {props.isEditable && (
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("body").style.overflow = "hidden";
            props.handleModal(true);
            const element = <AdEditModal 
            data={props.data}
            formRef={props.formRef}/>;
            props.handleModalBody(element);
          }}
          style={{ cursor: "pointer" }}
        >
          <div className="itemImage">
            <img src={props.data.image} alt="" />
          </div>
          <div className="itemName">{props.data.title}</div>
          <div className="itemPrice">{price}</div>
        </a>
      )}
    </Item>
  );
};

export default Page;
