import React, { useState, useEffect } from "react";
import { PageArea } from "./styles";

import {
    PageContainer,
    PageTitle,
    ErrorMessage,
} from "../../components/MainComponents";
import useApi from "../../helpers/OlxAPI";
import { doLogin } from "../../helpers/AuthHandler";

const Page = () => {
    const api = useApi();

    const [name, setName] = useState("");
    const [stateLoc, setStateLoc] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [stateList, setStateList] = useState([]);

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const getStates = async () => {
            const sList = await api.getStates();
            setStateList(sList);
        }
        getStates();
    }, [api])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setDisabled(true);

        if (password !== confirmPassword) {
            setError("Senhas não conferem");
            setDisabled(false);
            return;
        }

        const json = await api.register(name, email, password, stateLoc);

        if (json.error) {
            setError(json.error);
        } else {
            doLogin(json.token);
            window.location.href = "/";
        }
        setDisabled(false);
    };

    return (
        <PageContainer>
            <PageTitle>Cadastro</PageTitle>
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
                                required>
                                <option>Selecione</option>
                                
                                {stateList.map((stateObj, index) =>
                                    <option key={index} value={stateObj._id}>{stateObj.name}</option>
                                )}
                            </select>

                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">E-mail</div>
                        <div className="area--input">
                            <input
                                type="email"
                                disabled={disabled}
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
                                disabled={disabled}
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Confirmar Senha</div>
                        <div className="area--input">
                            <input
                                type="password"
                                disabled={disabled}
                                value={confirmPassword}
                                required
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--button">
                            <button disabled={disabled}>Fazer Cadastro</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer >
    );
};

export default Page;
