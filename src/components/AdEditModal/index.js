import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { PageArea } from "./styles";
import { PageContainer, ErrorMessage } from "../../components/MainComponents";
import useApi from "../../helpers/OlxAPI";

const Page = ({ data, formRef }) => {
  const api = useApi();
  const fileField = useRef();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [priceNegotiable, setPriceNegotiable] = useState("");
  const [desc, setDesc] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);

  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      const cList = await api.getCategories();
      setCategoriesList(cList);
      const adCategory = document.querySelector(
        `option[data-slug=${data.category}]`
      );

      if (adCategory) {
        setCategory(adCategory.value);
      }
    };
    getCategories();
    if (data.price) {
      setPrice(data.price);
    }
    setTitle(data.title);
    setDesc(data.description);
    setPriceNegotiable(data.priceNegotiable);
  }, [data]);

  const priceMask = createNumberMask({
    prefix: "R$ ",
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ".",
    allowDecimal: true,
    decimalSymbol: ",",
  });

  return (
    <PageContainer>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form ref={formRef}>
          <input type="hidden" value={data.id} name="id" />
          <label className="area">
            <div className="area--title">Título</div>
            <div className="area--input">
              <input
                type="text"
                name="title"
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
                name="category"
                disabled={disabled}
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Selecione</option>
                {categoriesList.map((category, index) => (
                  <option
                    key={index}
                    value={category._id}
                    data-slug={category.slug}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </label>
          <label className="area">
            <div className="area--title">Preço</div>
            <div className="area--input">
              <MaskedInput
                name="price"
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
                name="priceNegotiable"
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
                name="desc"
                disabled={disabled}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
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
                name="file"
              />
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
};

export default Page;
