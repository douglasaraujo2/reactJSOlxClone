import React, { useState, useEffect } from "react";
import { PageArea, SearchArea, SearchBox, CategoryList, AdList } from "./styles";
import { Link } from 'react-router-dom';
import { PageContainer } from "../../components/MainComponents";
import AdItem from '../../components/AdItem';

import useApi from "../../helpers/OlxAPI";

const Page = () => {
  const api = useApi();

  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const getStates = async () => {
      const sList = await api.getStates();
      setStateList(sList);
    }
    getStates();

    const getCategories = async () => {
      const cList = await api.getCategories();
      setCategories(cList);
    }
    getCategories();

    const getAds = async () => {
      const json = await api.getAds({
        sort: 'desc',
        limit: '8',

      });
      setAds(json.ads);
    }
    getAds();
  }, [api])

  return (
    <>
      <SearchArea>
        <PageContainer>
          <SearchBox>
            <form method="GET" action="/ads">
              <input type="text" name="q" placeholder="O que você procura?" />
              <select name="state">
                {stateList.map((state, index) => <option key={index} value={state._id}>{state.name}</option>)}
              </select>

              <button>Pesquisar</button>
            </form>
          </SearchBox>
          <CategoryList>
            {categories.map((category, index) =>
              <Link key={index} to={`/ads?cat=${category.slug}`} className="categoryItem">
                <img src={category.img} alt={category.name} />
                <span>{category.name}</span>
              </Link>)}
          </CategoryList>
        </PageContainer>
      </SearchArea>
      <PageContainer>
        <PageArea>
          <h2>Anúnicos Recentes</h2>
          <AdList>
            {ads.map((ad, index) =>
              <AdItem key={index} data={ad} />
            )}

          </AdList>
          <Link to="/ads" className="seeAllLink">Ver Todos</Link>
          <hr />

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </PageArea>
      </PageContainer>
    </>
  );
};

export default Page;
