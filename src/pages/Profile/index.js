import React, { useState, useEffect, useRef } from "react";
import { PageArea, AdList } from "./styles";
import { connect } from "react-redux";
import {
  mapStateToProps,
  mapDispatchToProps,
} from "../../helpers/ReducersHelper";

import {
  PageContainer,
  PageTitle,
  ErrorMessage,
} from "../../components/MainComponents";
import useApi from "../../helpers/OlxAPI";
import AdItem from "../../components/AdItem";

const Page = ({
  setModalStatus,
  setModalTitle,
  setModalBody,
  setModalButtons,
}) => {
  const api = useApi();

  const formRef = useRef(null);
  //Saved Data
  const [savedName, setSavedName] = useState("");
  const [savedStateLoc, setSavedStateLoc] = useState("");
  const [savedEmail, setSavedEmail] = useState("");

  //Modified Data
  const [name, setName] = useState("");
  const [stateLoc, setStateLoc] = useState("");
  const [email, setEmail] = useState("");
  

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [ads, setAds] = useState([]);
  const [stateList, setStateList] = useState([]);

  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");

  const buttonHandler = async () => {
    let formData = new FormData();
    let id = "6078d56335f53745e6694ed5";
    for (var element of formRef.current.elements) {
      if (element.type === "file" && element.files.length > 0) {
        for (let file of element.files) {
          formData.append("img", file);
        }
      } else if (element.type === "checkbox") {
        // formData.append(element.name, element.checked ? "X" : "");
        continue;
      } else if (element.name == "id") {
        id = element.value;
      } else {
        if (element.name === "price") {
          formData.append(element.name, element.value.replace("R$ ", ""));
        } else {
          formData.append(element.name, element.value);
        }
      }
    }
    document.querySelector("body").style.overflow = "inherit";
    setDisabled(true);
    const response = await api.updateAd(formData, id);
    setModalStatus(false);
    if (response.error) {
      setError(response.error);
      setDisabled(false);
      return;
    }
    setDisabled(false);
    doRequests();
  };

  const doRequests = async () => {
    let [sList, userInfo] = await Promise.all([
      api.getStates(),
      api.getUserInfo(),
    ]);
    setStateList(sList);
    setName(userInfo.name);
    setEmail(userInfo.email);
    const userAds = userInfo.ads.map((ad) => {
      const img = ad.images.find((img) => img.default === true);
      if (img) {
        return {
          ...ad,
          image: `${api.getBaseUrl()}/media/${img.url}`,
        };
      } else {
        return ad;
      }
    });

    setAds(userAds);
    const userState = Array.from(document.querySelectorAll("option")).find(
      (el) => el.textContent === userInfo.state
    ).value;
    setStateLoc(userState);
  };

  useEffect(() => {
    setModalTitle("Editar anúncio");
    setModalButtons([
      { text: "Salvar", handler: buttonHandler, class: "btnSuccess" },
    ]);
    const handleRequests = async () => {
      await doRequests();
    };
    handleRequests();
  }, [api]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setDisabled(true);

    if (isEditPassword && password !== confirmPassword) {
      setError("Senhas não conferem");
      setDisabled(false);
      return;
    }

    const response = await api.updateUser(name,  password, stateLoc);
    if (response.error) {
      setError(response.error);
      setDisabled(false);
      return;
    }
    setDisabled(false);
    doRequests();
  };

  return (
    <PageContainer>
      {/* {showModal && <Modal />} */}
      <PageTitle>Perfil</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">Nome Completo</div>
            <div className="area--input">
              <input
                type="text"
                disabled={disabled}
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Estado</div>
            <div className="area--input">
              <select
                value={stateLoc}
                disabled={disabled}
                onChange={(e) => setStateLoc(e.target.value)}
                required
              >
                <option>Selecione</option>

                {stateList.map((stateObj, index) => (
                  <option key={index} value={stateObj._id}>
                    {stateObj.name}
                  </option>
                ))}
              </select>
            </div>
          </label>
          <label className="area">
            <div className="area--title">E-mail</div>
            <div className="area--input">
              <input
                type="email"
                disabled={true}
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Senha</div>
            <div className="area--input">
              <input
                type="password"
                disabled={isEditPassword ? disabled : true}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </label>
          <label
            className="area"
            style={{ display: isEditPassword ? "flex" : "none" }}
          >
            <div className="area--title">Confirmar Senha</div>
            <div className="area--input">
              <input
                type="password"
                disabled={disabled}
                value={confirmPassword}
                required={isEditPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title"></div>
            <div className="area--button">
              <button
                disabled={disabled}
                onClick={(e) => {
                  e.preventDefault();
                  const newPasswordStatus = !isEditPassword;
                  setIsEditPassword(newPasswordStatus);
                  if (newPasswordStatus) {
                    setPassword("");
                  } else {
                    setPassword("");
                  }
                }}
              >
                Editar Senha
              </button>
              <button disabled={disabled}>Atualizar Cadastro</button>
            </div>
          </label>
        </form>
      </PageArea>
      <PageTitle>Meus Anúnicos</PageTitle>
      <PageArea>
        <AdList>
          {ads.map((ad, index) => (
            <AdItem
              key={index}
              data={ad}
              isEditable={true}
              handleModal={setModalStatus}
              handleModalBody={setModalBody}
              formRef={formRef}
            />
          ))}
        </AdList>
      </PageArea>
    </PageContainer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
