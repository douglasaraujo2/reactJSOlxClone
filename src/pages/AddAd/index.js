import React, { useEffect, useRef, useState } from "react";
import { useHistory } from 'react-router-dom';
import { PageArea } from "./styles";
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import {
  PageContainer,
  PageTitle,
  ErrorMessage,
} from "../../components/MainComponents";
import useApi from "../../helpers/OlxAPI";


const Page = () => {
  const api = useApi();
  const fileField = useRef();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [priceNegotiable, setPriceNegotiable] = useState(false);
  const [desc, setDesc] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);

  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      let cList = await api.getCategories();
      console.log(cList);
      setCategoriesList(cList);
    }
    getCategories();
  }, [api]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setDisabled(true);

    let errors = [];
    if (!title.trim()) {
      errors.push("Título não preenchido")
    }

    if (!category) {
      errors.push("Categoria não preenchida")
    }

    if (errors.length) {
      setError(errors.join("\n"));
      setDisabled(false);
      return;
    }

    const fData = new FormData();

    fData.append("title", title);
    fData.append("price", price);
    fData.append("priceNeg", priceNegotiable);
    fData.append("desc", desc);
    fData.append("cat", category);

    if (fileField.current.files.length) {
      for (let file of fileField.current.files) {
        fData.append('img', file);
      }
    }

    const json = await api.addAd(fData);

    if (!json.error) {
      history.push(`/ad/${json.id}`);
      setDisabled(false);
      return;
    } else {
      setError(json.error);
    }

    setDisabled(false);
  };

  const priceMask = createNumberMask({
    prefix: 'R$ ',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ','
  });

  return (
    <PageContainer>
      <PageTitle>Postar um anúncio</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">Título</div>
            <div className="area--input">
              <input
                type="text"
                disabled={disabled}
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Categoria</div>
            <div className="area--input">
              <select
                disabled={disabled}
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >

                <option>Selecione</option>
                {categoriesList.map((category, index) =>
                  <option key={index} value={category._id}>{category.name}</option>
                )}
              </select>

            </div>
          </label>
          <label className="area">
            <div className="area--title">Preço</div>
            <div className="area--input">
              <MaskedInput
                mask={priceMask}
                placeholder="R$"
                disabled={disabled || priceNegotiable}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Preço Negociável</div>
            <div className="area--input">
              <input
                type="checkbox"
                disabled={disabled}
                checked={priceNegotiable}
                onChange={(e) => setPriceNegotiable(!priceNegotiable)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Descrição</div>
            <div className="area--input">
              <textarea
                disabled={disabled}
                value={desc}
                onChange={e => setDesc(e.target.value)}></textarea>
            </div>
          </label>
          <label className="area">
            <div className="area--title">Imagens (1 ou mais)</div>
            <div className="area--input">
              <input
                type="file"
                disabled={disabled}
                ref={fileField}
                multiple
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={disabled}>Adicionar Anúncio</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
};

export default Page;
