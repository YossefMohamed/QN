import React, { FC } from "react";
import styled from "styled-components";
import { colors } from "../constant";
interface ImagePath {
  path: string;
  title: string;
  content: string;
}
export const Card: FC<ImagePath> = ({ path, title, content }) => {
  return (
    <CardContainer>
      <img loading="lazy" src={path} alt={title} />
      <div className="overlay"></div>

      <div className="content">
        <div className="content-title">{title} </div>
        <div className="content-para">{content} </div>
      </div>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  img {
    width: 100%;
    height: 100%;
  }
  height: 300px;
  position: relative;
  width: 400px;
  margin: 0 10px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background: ${colors.main};
  border-radius: 10px;
  overflow: hidden;
  .content {
    position: absolute;
    z-index: 99;
    bottom: 20px;
    left: 20px;
    color: white;
  }
  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgb(61, 116, 54);
    opacity: 0.5;
    mix-blend-mode: multiply;
  }
  @media (max-width: 587px) {
    margin:auto;
    width: 90% !important;
  }
`;
