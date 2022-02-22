import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CardSurah from "../components/CardSurah";
import { Loader } from "../components/Loader";
import { Titlehadith } from "../components/styled-components/homePage";
import { colors } from "../constant";
import { Rootstate } from "../store/store";
import { getSurahs } from "../store/surahsSlice";

const Surahs = () => {
  const surahsReducer = useSelector((state: Rootstate) => state.surahs);
  const dispatch = useDispatch();
  useEffect(() => {
    !surahsReducer.surahs.length && dispatch(getSurahs());
  }, []);

  return (
    <SunnahHeader>
      <Titlehadith>أختار اي سورة :</Titlehadith>
      <SunnahContainer>
        {surahsReducer.loading ? (
          <Loader />
        ) : (
          surahsReducer.surahs.map((el, idx) => {
            return (
              <CardSurah
                key={idx}
                number={idx}
                type="surah"
                name={el.name}
                englishName={el.englishName}
              />
            );
          })
        )}
      </SunnahContainer>
    </SunnahHeader>
  );
};

const SunnahContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const SunnahHeader = styled.div`
  .header-container {
    width: 100%;
    direction: rtl;
  }
  h5 {
    direction: rtl;
    width: fit-content;
    padding: 10px 10px;
    border-bottom: 2px solid ${colors.main};
  }
  margin: 50px 0;
`;

export default Surahs;
