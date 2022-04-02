import styled from "styled-components";
import CardSurah from "../components/CardSurah";
import { azkar, colors } from "../constant";

export const Azkary = () => {
  return (
    <>
      <SunnahHeader>
        <div className="header-container">
          <h3>أختارنوع الاذكار :</h3>
        </div>
      </SunnahHeader>
      <AzkaryContainer>
        {Object.keys(azkar).map((el, idx) => (
          <CardSurah
            key={idx}
            number={idx}
            name={el}
            type="azkary"
            englishName={
              el === "أذكار الصباح"
                ? "Azkar El Muslim"
                : el === "أذكار المساء"
                ? "Azkar El  Masaa'"
                : el === "أذكار بعد السلام من الصلاة المفروضة"
                ? "Azur After The Salah"
                : el === "تسابيح"
                ? "Tsabyeh"
                : el === "أذكار النوم"
                ? "Azkar El Noum"
                : el === "أذكار الاستيقاظ"
                ? "Wake up Azkar"
                : el === "أدعية قرآنية"
                ? "Quran Azkar"
                : el === "أدعية الأنبياء"
                ? "Doaa ElAnbia'"
                : ""
            }
          />
        ))}
      </AzkaryContainer>
    </>
  );
};
const SunnahHeader = styled.div`
  .header-container {
    width: 100%;
    direction: rtl;
  }
  h3 {
    direction: rtl;
    width: fit-content;
    padding: 10px 10px;
    border-bottom: 2px solid ${colors.main};
  }
  margin: 50px;
`;
const AzkaryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
