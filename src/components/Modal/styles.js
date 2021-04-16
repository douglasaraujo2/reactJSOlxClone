import styled from "styled-components";

export const Modal = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  justify-content: center;
  background: transparent;
  &.hide {
    display: none;
  }
  &.show {
    display: flex;
  }
  flex-direction: column;
  .closeModal {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    cursor: pointer;
    color: #ccc;
    margin-right: 10px;
    &:hover {
      color: #000;
    }
  }
`;

export const ModalBackdrop = styled.div`
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const ModalArea = styled.div`
  overflow: auto;
  min-width: 700px;
  background: #fff;
  display: flex;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
  flex-direction: column;
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ModalBody = styled.div``;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
  padding: 5px;
  /* margin-bottom: px; */
  .btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin-right: 5px;
    cursor: pointer;
  }
  .btnSecondary {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
  }
  .btnSuccess {
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
  }
  .btnDanger {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
  }
`;
