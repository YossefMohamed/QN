import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors, sizes } from "../constant";

const CardSurah: FC<{
  number: number;
  type?: string;
  name: string;
  englishName: string;
}> = ({ number, name, englishName, type }) => {
  const nagigate = useNavigate();
  const onCLickCardSurah = () => {
    type === "azkary"
      ? nagigate(`/azkary/${name}`)
      : type === "death"
      ? console.log(4)
      : type === "surah"
      ? nagigate(`/surah/${number}`)
      : nagigate(`/sunnah/${type}`);
  };
  return (
    <CardSurahContainer onClick={onCLickCardSurah}>
      <div className="surah-number">{number + 1}</div>
      <div className="surah-title__ar">{name}</div>
      <div className="surah-title__en">{englishName}</div>
    </CardSurahContainer>
  );
};

const CardSurahContainer = styled.div` 
font-family: "Amiri";

cursor:pointer;
margin : 20px;
    display:flex;
    flex-direction:column;
    padding:15px;
    width : 28%;
    height : 165px;
    border : 2px solid ${colors.main};
    border-radius:10px;
    @media (max-width: 768px) {
margin : 5px;

      width : 45%!important;
    }
    @media (max-width: 450px) {
margin : 5px;

      width : 85%!important;
    }
    & .surah-number{
        margin-right: 16px;
    background-color: #e1e1e4;
    font-size:${sizes.small};
    border-radius: 100%;
    width: 32px;
    margin:5px 0 ;
    text-align:left;
    
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333647;
    }
    & .surah-title__ar{
    direction:rtl;
        font-size: ${sizes.normal};
        font-weight:bold;
    }& .surah-title__en{
        font-size: ${sizes.normal};
    direction:ltr;

    }
    &:hover{
        background:${colors.main};
        .surah-title__ar , .surah-title__en{{
            color:#fff
        }
    }
   
`;

export default CardSurah;
