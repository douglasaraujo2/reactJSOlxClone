/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  PageArea,
  LeftContainer,
  RightContainer,
  AdList,
  ListWarning,
  Pagination,
  PaginationItem,
} from "./styles";
import { PageContainer } from "../../components/MainComponents";
import AdItem from "../../components/AdItem";

import useApi from "../../helpers/OlxAPI";

let timer;
const Page = () => {
  const api = useApi();
  const history = useHistory();

  const useQueryString = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQueryString();

  const [q, setQ] = useState(query.get("q") != null ? query.get("q") : "");
  const [cat, setCat] = useState(
    query.get("cat") != null ? query.get("cat") : ""
  );
  const [stateName, setStateName] = useState(
    query.get("state") != null ? query.get("state") : ""
  );

  const [adsTotal, setAdsTotal] = useState(0);
  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ads, setAds] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [actualLstPage, setActualLstPage] = useState(0);
  const [actualFstPage, setActualFstPage] = useState(0);
  const [currentPage, setCurrenctPage] = useState(0);

  const [resultOpacity, setResultOpacity] = useState(0.3);
  const [loading, setLoading] = useState(true);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [showLessButton, setShowLessButton] = useState(false);
  const [pagination, setPagination] = useState([]);

  const getAdsList = async () => {
    setAds([]);
    setLoading(true);
    let offset = 0;
    if(currentPage > 0){
      offset = (currentPage * 9);
    }
    const json = await api.getAds({
      sort: "desc",
      limit: "9",
      q,
      cat,
      state: stateName,
      offset
    });
    setAds(json.ads);
    setAdsTotal(json.total);
    setResultOpacity(1);
    setLoading(false);
  };

  useEffect(() => {
    if (ads.length > 0) {
      const mathCount = Math.ceil(adsTotal / ads.length);
      setActualFstPage(0);
      setPageCount(mathCount);

      for (let i = 1; i <= mathCount; i++) {
        setPagination((prevArray) => [
          ...prevArray,
          {
            value: i,
            visible: i <= 5,
          },
        ]);
      }
      setShowMoreButton(false);
      if(mathCount > 5){
        setShowMoreButton(true);
      }
      setShowLessButton(false);
      setActualLstPage(4);
    } else {
      setPageCount(0);
      setActualFstPage(0);
      setActualLstPage(0);
      setShowMoreButton(false);
      setShowLessButton(false);
    }
  }, [adsTotal]);

  useEffect(() =>{
    setResultOpacity(0.3);
    getAdsList();
  },[currentPage])

  useEffect(() => {
    let queryString = [];
    if (q) {
      queryString.push(`q=${q}`);
    }
    if (cat) {
      queryString.push(`cat=${cat}`);
    }
    if (stateName) {
      queryString.push(`state=${stateName}`);
    }

    history.replace({
      search: `?${queryString.join("&")}`,
    });

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(getAdsList, 2000);
    setResultOpacity(0.3);
    setCurrenctPage(0);
    setPagination([]);
  }, [q, stateName, cat, history]);

  useEffect(() => {
    const getStates = async () => {
      const sList = await api.getStates();
      setStateList(sList);
    };
    getStates();

    const getCategories = async () => {
      const cList = await api.getCategories();
      setCategories(cList);
    };
    getCategories();
  }, [api]);

  const handleMorePagination = () => {
    let newPagArr = [...pagination]; // copying the old datas array
    newPagArr[actualFstPage].visible = false;
    newPagArr[actualLstPage + 1].visible = true;
    setPagination(newPagArr);
    setActualFstPage(actualFstPage + 1);
    setActualLstPage(actualLstPage + 1);
    setShowLessButton(true);
    if (actualLstPage >= pageCount) {
      setShowMoreButton(false);
    }
  };

  const handleLessPagination = (e) => {
    e.preventDefault();
    let newPagArr = [...pagination]; // copying the old datas array
    newPagArr[actualLstPage].visible = false;
    newPagArr[actualFstPage - 1].visible = true;
    if ((actualFstPage - 1) === 0) {
      setShowLessButton(false);
      setActualFstPage(0);
      setActualLstPage(4);
      setPagination(newPagArr);
      return;
    }
    setPagination(newPagArr);
    setActualFstPage(actualFstPage - 1);
    setActualLstPage(actualLstPage - 1);
  };

  return (
    <PageContainer>
      <PageArea>
        <LeftContainer>
          <form method="GET">
            <input
              type="text"
              name="q"
              placeholder="O que você procura?"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />

            <div className="filterName">Estado:</div>
            <select
              name="state"
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
            >
              <option>Selecione</option>
              {stateList.map((stateObject, index) => {
                return (
                  <option key={index} value={stateObject.name}>
                    {stateObject.name}
                  </option>
                );
              })}
              ;
            </select>

            <div className="filterName">Categoria:</div>
            <ul>
              {categories.map((category, index) => {
                return (
                  <li
                    key={index}
                    className={
                      category.slug === cat
                        ? "categoryItem active"
                        : "categoryItem"
                    }
                    onClick={() => setCat(category.slug)}
                  >
                    <img src={category.img} alt="" />
                    <span>{category.name}</span>
                  </li>
                );
              })}
            </ul>
          </form>
        </LeftContainer>
        <RightContainer>
          <h2>Resultados</h2>
          {loading && ads.length === 0 && <ListWarning>Carregando...</ListWarning>}
          {!loading && ads.length === 0 && (
            <ListWarning>Nenhum resultado encontrado...</ListWarning>
          )}
          <AdList opacity={resultOpacity}>
            {ads.map((item, index) => {
              return <AdItem key={index} data={item} />;
            })}
          </AdList>
          <Pagination>
            {showLessButton && (
              <PaginationItem
                showItem={showLessButton}
                onClick={handleLessPagination}
              >
                &lt;
              </PaginationItem>
            )}
            {pagination.map((item, index) => {
              return (
                <PaginationItem
                  showItem={item.visible}
                  key={index}
                  className={currentPage === index ? "active" : ""}
                  onClick={() => setCurrenctPage(index)}
                >
                  {item.value}
                </PaginationItem>
              );
            })}
            {showMoreButton && (
              <PaginationItem
                showItem={showMoreButton}
                onClick={handleMorePagination}
              >
                &gt;
              </PaginationItem>
            )}
          </Pagination>
        </RightContainer>
      </PageArea>
    </PageContainer>
  );
};

export default Page;
