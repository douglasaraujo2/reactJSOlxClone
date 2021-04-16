const initialState = {
  isModalOpen: false,
  title: "Modal Title",
  modalBody: "",
  buttons: [],
};
// eslint-disable-next-line
export default (state = initialState, action) => {
  if (action.type === "TOGGLE_MODAL") {
    return { ...state, isModalOpen: action.payload.isModalOpen };
  }
  if (action.type === "SET_MODAL_BODY") {
    return { ...state, modalBody: action.payload.body };
  }
  if (action.type === "SET_MODAL_TITLE") {
    return { ...state, title: action.payload.title };
  }
  if (action.type === "SET_MODAL_BUTTONS") {
    return { ...state, buttons: action.payload.buttons };
  }
  return state;
};
