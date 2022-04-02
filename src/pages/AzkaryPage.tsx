import { useNavigate, useParams } from "react-router";
import Ayah from "../components/Ayah";
import { azkar, colors } from "../constant";
import styled from "styled-components";

const AzkaryPage = () => {
  const params = useParams();
  const keyTyped = params.id as keyof typeof azkar;
  const nagigate = useNavigate();

  return (
    <>
      <SunnahHeader>
        <div className="header-container" onClick={(e) => nagigate("/azkary")}>
          <h3>{"العودة لباقي الاذكار :"}</h3>
        </div>
      </SunnahHeader>
      <div>
        {azkar[keyTyped].map((el, idx) => (
          <h1 key={idx}>
            {
              <Ayah
                text={el.content}
                type="azkary"
                number={Number(el.count)}
                tafsser={el.description}
                englishText={el.reference}
              />
            }
          </h1>
        ))}
      </div>
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
    &:hover {
      background: ${colors.main};
      color: #fff;
      cursor: pointer;
    }
  }
  margin: 50px 0;
`;

export default AzkaryPage;
