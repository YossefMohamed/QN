import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CardSurah from "../components/CardSurah";
import { Loader } from "../components/Loader";
import { Titlehadith } from "../components/styled-components/homePage";
import { colors } from "../constant";

const Sunnah = () => {
  const [sunnahBooks, setSunnahBooks] = useState<any[]>([]);
  useEffect(() => {
    fetch("https://api.hadith.gading.dev/books")
      .then((e) => e.json())
      .then((data) => setSunnahBooks(data.data));
  }, []);

  return (
    <SunnahHeader>
      <Titlehadith>أختار اي كتاب :</Titlehadith>
      <SunnahContainer>
        {sunnahBooks.length ? (
          sunnahBooks.map((el, idx) => {
            return (
              <CardSurah
                key={idx}
                number={idx}
                type={el.id}
                name={
                  el.id === "abu-daud"
                    ? "سنن ابو داوود"
                    : el.id === "ahmad"
                    ? "سنن احمد"
                    : el.id === "bukhari"
                    ? "سنن البخارى"
                    : el.id === "darimi"
                    ? "سنن الدارمى"
                    : el.id === "ibnu-majah"
                    ? "سنن ابن ماجه"
                    : el.id === "muslim"
                    ? "سنن مسلم"
                    : el.id === "nasai"
                    ? "سنن النسائى"
                    : el.id === "tirmidzi"
                    ? "سنن الترمذى"
                    : el.id === "malik"
                    ? "سنن مالك"
                    : ""
                }
                englishName={el.name}
              />
            );
          })
        ) : (
          <Loader />
        )}
      </SunnahContainer>
    </SunnahHeader>
  );
};

const SunnahContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 1039px) {
    justify-content: center;
  }
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
  margin: 50px 0px;
  @media (max-width: 1039px) {
    margin: 5px;
  }
`;

export default Sunnah;
