import React, { useEffect } from "react";
import styled from "styled-components";
import { colors, sizes } from "../constant";

export const FormModel: React.FC<{
  appear: boolean;
  setDisplay: any;
  disabled: boolean;
  action: any;
  message: string;
}> = (props) => {
  return (
    <Container style={{ display: props.appear ? "flex" : "none" }}>
      <div className="title">{props.message}</div>
      <div className="input">{props.children}</div>
      <div className="buttons">
        <button onClick={() => props.action()} disabled={props.disabled}>
          أضف
        </button>
        <button onClick={() => props.setDisplay(false)}>أغلاق</button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50%;
  background-color: white;
  z-index: 90000010 !important;
  transform: translate(-50%, -50%);
  text-align: center;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  box-shadow: 20px 20px 50px 15px grey;
  padding: 20px;
  .buttons {
    margin: 0px 0;
    display: flex;
    justify-content: center;
  }

  .input {
    margin: 35px auto;
    width: 50%;
    input {
      outline: none;
      border: 0;
      width: 100%;
      border-bottom: 1px solid ${colors.main};
      padding: 10px;
      font-size: ${sizes.normal};
      direction: rtl;
    }
  }
  button {
    cursor: pointer;
    font-size: calc(${sizes.normal} - 2px);
    width: fit-content;
    padding: 10px 15px;
    border-radius: 6px;
    margin: 0 10px;
    border: 2px solid ${colors.main};
    color: white;

    background-color: ${colors.main};
    &:hover {
      color: initial;

      background: white;
    }
    &:disabled {
      opacity: 0.5;
      cursor: initial;
    }
  }

  @media (max-width: 1095px) {
    width: 100%;
    .input {
      margin: 35px auto;
      width: 90%;
      input {
        margin: 10px 0;
      }
    }
  }
`;
