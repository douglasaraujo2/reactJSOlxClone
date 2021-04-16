import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import Routes from "./Routes";
import { Template } from "./components/MainComponents";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "../src/components/Modal";

import { mapStateToProps, mapDispatchToProps } from "./helpers/ReducersHelper";

import "./App.css";

const Page = (props) => {
  const [modalBody, setModalModay] = useState("");
 
  return (
    <BrowserRouter>
      <Modal>
        {modalBody}
      </Modal>
      <Template>
        <Header />
        <Routes />
        <Footer />
      </Template>
    </BrowserRouter>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
