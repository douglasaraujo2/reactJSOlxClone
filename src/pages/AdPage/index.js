import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import AdItem from '../../components/AdItem';
import { Link } from 'react-router-dom';

import {
  PageArea,
  Box,
  LeftContainer,
  AdImage,
  AdInfo,
  AdName,
  AdDescription,
  RightContainer,
  Fake,
  AdTitle,
  AdSmall,
  AdPrice,
  SellerLink,
  OthersArea,
  AdList,
  BreadCrumb
} from "./styles";

import {
  PageContainer
} from "../../components/MainComponents";
import useApi from "../../helpers/OlxAPI";

const Page = () => {
  const api = useApi();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [adInfo, setAdInfo] = useState({});

  useEffect(() => {
    const getAdInfo = async (id) => {
      const json = await api.getAd(id, true);
      setAdInfo(json);
      setLoading(false);
    }
    getAdInfo(id);
  }, [api,id]);

  const formatDate = (date) => {
    let cDate = new Date(date);
    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    let cDay = cDate.getDate();
    let cMonth = cDate.getMonth();
    let cYear = cDate.getFullYear();

    return `${cDay} de ${months[cMonth]} de ${cYear}`;

  }

  return (
    <PageContainer>
      {adInfo.category &&
        <BreadCrumb>
          Você está aqui:
        <Link to="/">Home</Link>/
        <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>/
        <Link to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}>{adInfo.category.name}</Link>/
        &nbsp;{adInfo.title}
        </BreadCrumb>
      }
      <PageArea>
        <LeftContainer>
          <Box className="left">
            <AdImage>
              {loading && <Fake height={300} />}
              {adInfo.images &&
                <Slide>
                  {adInfo.images.map((img, index) => {
                    return (
                      <div key={index} className="each-slide">
                        <img src={img} alt="" />
                      </div>);
                  })}
                </Slide>
              }
            </AdImage>
            <AdInfo>
              <AdName>
                {loading && <Fake height={20} />}
                {adInfo.title &&
                  <AdTitle>{adInfo.title}</AdTitle>}
                {adInfo.dateCreated &&
                  <AdSmall>Criado em: {formatDate(adInfo.dateCreated)}</AdSmall>
                }
              </AdName>
              <AdDescription>
                {loading && <Fake height={100} />}
                {adInfo.description}
                <hr />
                {adInfo.views &&
                  <AdSmall>Visualizações: {adInfo.views}</AdSmall>
                }
              </AdDescription>
            </AdInfo>
          </Box>
        </LeftContainer>
        <RightContainer>
          <Box className="box--padding">
            {loading && <Fake height={20} />}
            {adInfo.priceNegotiable && "Preço Negociavel"}
            {!adInfo.priceNegotiable && adInfo.price &&
              <AdPrice>
                Preço: <span>{Number(adInfo.price).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</span>
              </AdPrice>
            }
          </Box>
          {loading && <Fake height={50} />}
          {adInfo.userInfo &&
            <>
              <SellerLink href={`mailto:${adInfo.userInfo.email}`} className="contactSellerLink" target="_blank">
                Fale com o vendedor
              </SellerLink>
              <Box className="box--padding createdBy">
                <strong>{adInfo.userInfo.name}</strong>
                <small>E-mail:{adInfo.userInfo.email}</small>
                <small>Estado: {adInfo.stateName}</small>
              </Box>
            </>
          }
        </RightContainer>
      </PageArea>
      <OthersArea>
        {adInfo.others &&
          <>
            <h2>Outras Ofertas do Vendedor</h2>
            <AdList>
              {adInfo.others.map((ad, index) =>
                // <div className="teste">{index}</div>
                <AdItem data={ad} key={index} />
              )}

            </AdList>
          </>
        }
      </OthersArea>
    </PageContainer >
  );
};

export default Page;
