import React, { FC, useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import styled from "styled-components";
import { colors, sizes } from "../constant";

const Ayah: FC<{
  text: string;
  number: Number;
  englishText: string;
  audio: string;
}> = ({ text, number, englishText, audio }) => {
  return (
    <AyahContainer>
      <div className="ayah-number">
        <div className="number">{number}</div>

        <div className="surah-tools">
          <div className="fav-button">
            <button>
              <i className="fa fa-star"></i>
            </button>
          </div>
          <div>
            <button>
              <i className="fa fa-comment"></i>{" "}
            </button>
          </div>
          <div>
            <button>
              <i className="fa fa-play"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="ayah-text__ar">{text}</div>
      <div className="ayah-text__en">{englishText}</div>
    </AyahContainer>
  );
};

const AyahContainer = styled.div`
  .ayah-number {
    padding: 5px;
    display: flex;
    justify-content: space-between;
    .surah-tools {
      width: 100%;
      display: flex;
      opacity: 0;

      justify-content: flex-end;
      button {
        width: 30px;
        font-size: 12px;
        height: 30px;
        outline: none;
        border-radius: 50%;
        margin: 0 15px 0 0;
        background: ${colors.main};

        border: 2px solid ${colors.main};
        color: white;
        &:hover {
          background: rgb(178 178 178);

          color: white;
        }
        .fav-button button:hover {
          background: rgb(178 178 178);
          border: rgb(178 178 178);
          color: rgb(255 200 0);
        }
      }
    }
  }
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  &:hover {
    background: rgb(86, 167, 75, 0.12);
  }
  border-bottom: 2px solid gray;
  min-height: 200px;
  font-size: ${sizes.normal};
  .ayah-text__ar {
    direction: rtl;
    font-size: calc(${sizes.normal} + 2px);
    margin: 10px 0;
  }
  .ayah-text__en {
    font-size: calc(${sizes.normal} + 2px);
  }
  &:hover {
    .surah-tools {
      opacity: 1;
    }
    .fav-button button:hover {
      background: rgb(178 178 178);
      border: rgb(178 178 178);
      color: rgb(255 200 0);
    }
  }
`;

export default Ayah;
