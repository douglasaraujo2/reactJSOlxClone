const mapStateToProps = (state) => {
  return {
    user: state.user,
    modal: state.modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setModalStatus: (newStatus) =>
      dispatch({
        type: "TOGGLE_MODAL",
        payload: {
          isModalOpen: newStatus,
        },
      }),
    setModalTitle: (newTitle) =>
      dispatch({
        type: "SET_MODAL_TITLE",
        payload: {
          title: newTitle,
        },
      }),
    setModalBody: (newBody) =>
      dispatch({
        type: "SET_MODAL_BODY",
        payload: {
          body: newBody,
        },
      }),
    setModalButtons: (buttonsList) =>
      dispatch({
        type: "SET_MODAL_BUTTONS",
        payload: {
          buttons: buttonsList,
        },
      }),
  };
};

export { mapStateToProps, mapDispatchToProps };
