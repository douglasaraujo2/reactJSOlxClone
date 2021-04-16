import styled from "styled-components";

export const PageArea = styled.div`
  
  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: 10px;
    .area {
      width: 100%;
      padding: 10px;
      .area--title {
        padding-right: 20px;
        font-weight: bold;
        font-size: 14px;
      }
      .area--input {
        /* width: 100%; */
        input:not([type="checkbox"]),
        select,
        textarea {
          width: 100%;
          font-size: 14px;
          padding: 5px;
          border: 1px solid #ddd;
          border-radius: 3px;
          outline: 0;
          transition: all ease 0.4s;

          &:focus {
            border: 1px solid #333;
            color: #333;
          }
        }

        input[type="checkbox"] {
          background-color: transparent;
        }

        textarea {
          height: 80px;
          resize: none;
        }

        button {
          background-color: #0089ff;
          border: 0;
          outline: 0;
          padding: 5px 10px;
          border-radius: 4px;
          color: #fff;
          font-size: 15px;
          cursor: pointer;

          &:hover {
            background-color: #006fce;
          }
        }
      }
    }
  }
`;
