import React, { useEffect } from "react";
import {
  Modal,
  ModalArea,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalBackdrop,
} from "./styles";
import { connect } from "react-redux";
import {
  mapStateToProps,
  mapDispatchToProps,
} from "../../helpers/ReducersHelper";

const Page = ({ modal, setModalStatus }) => {
  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (e.key.toUpperCase() === "ESCAPE") {
        handleCloseModal();
      }
      return () => {
        document.removeEventListener("keyup");
      };
    });
  }, []);

  const handleCloseModal = () => {
    setModalStatus(false);
    document.querySelector("body").style.overflow = "inherit";
  };

  return (
    <Modal className={modal.isModalOpen ? "show" : "hide"}>
      <ModalBackdrop />
      <ModalArea>
        <ModalHeader>
          <div></div>
          <h4>{modal.title || "Header"}</h4>
          <div
            className="closeModal"
            onClick={() => {
              handleCloseModal();
            }}
          >
            X
          </div>
        </ModalHeader>
        <ModalBody>{modal.modalBody || "Body"}</ModalBody>
        <ModalFooter>
          <button
            className="btn btnSecondary"
            onClick={() => {
              handleCloseModal();
            }}
          >
            Fechar
          </button>
          {modal.buttons &&
            modal.buttons.map((btn, index) => {
              return (
                <button key={index} onClick={btn.handler} className={`btn ${btn.class}`}>
                  {btn.text}
                </button>
              );
            })}
        </ModalFooter>
      </ModalArea>
    </Modal>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Page);
