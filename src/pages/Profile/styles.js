import styled from "styled-components";

export const PageArea = styled.div`
  h1 {
    margin: 10px;
  }
  form {
    background-color: #fff;
    border-radius: 3px;
    padding: 10px;
    box-shadow: 0px 0px 3px #999;
    .area {
      display: flex;
      align-items: center;
      padding: 10px;
      max-width: 500px;

      .area--title {
        width: 200px;
        text-align: right;
        padding-right: 20px;
        font-weight: bold;
        font-size: 14px;
      }
      .area--input {
        flex: 1;

        input:not([type="checkbox"]) {
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
        select {
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
      }
      .area--button {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        button {
          background-color: #0089ff;
          border: 0;
          outline: 0;
          padding: 5px 10px;
          border-radius: 4px;
          color: #fff;
          font-size: 15px;
          margin: 5px;
          cursor: pointer;

          &:hover {
            background-color: #006fce;
          }
        }
      }
    }
  }
  @media (max-width: 600px) {
    margin: 10px;
    form {
      .area {
        flex-direction: column;

        .area--title {
          width: 100%;
          text-align: left;
          margin-bottom: 10px;
          font-size: 25px;
        }

        .area--input {
          width: 100%;
          input {
            font-size: 20px !important;
          }
        }
        .area--button {
          width: 100%;
          button {
            width: 100%;
            height: 90px;
            font-size: 20px;
          }
        }
      }
    }
  }
`;

export const AdList = styled.div`
  display: flex;
  flex-wrap: wrap;
  .itemAd {
    width: 25%;
  }
  @media (max-width: 600px) {
    width: 50%;
  }
`;
