import React, { useState } from "react";
import styled from "styled-components";
import Ayah from "../components/Ayah";
import CardSurah from "../components/CardSurah";
import { colors } from "../constant";

const Tzkar = () => {
  const [names, setNames] = useState([
    {
      name: "يوسف محمد عبالمحسن",
      date: "199",
    },
    {
      name: "يوسف محمد عبالمحسن",
      date: "1998",
    },
    {
      name: "يوسف محمد عبالمحسن",
      date: "1998",
    },
    {
      name: "يوسف محمد عبالمحسن",
      date: "1998",
    },
    {
      name: "يوسف محمد عبالمحسن",
      date: "1998",
    },
    {
      name: "يوسف محمد عبالمحسن",
      date: "1998",
    },
    {
      name: "يوسف محمد عبالمحسن",
      date: "1998",
    },
    {
      name: "يوسف محمد عبالمحسن",
      date: "1998",
    },
  ]);
  return (
    <div>
      <HadithHeader className="hadith--header">
        <h5> تذكروهم بالخير ❤️</h5>
      </HadithHeader>
      <Ayah
        text={
          "كان رسولَ اللَّهِ صلَّى اللَّهُ علَيهِ وسلَّمَ يصلِّي علَى مَيِّتٍ فسمِعتُ في دعائِهِ وَهوَ يقولُ : اللَّهمَّ اغفرْ لَهُ وارحمهُ ، وعافِهِ واعفُ عنهُ ، وأكْرِم نُزَلَهُ ، ووسِّع مُدَخلَهُ ، واغسلْهُ بالماءِ والثَّلجِ والبَردِ ، ونقِّهِ منَ الخطايا كما نقَّيتَ الثَّوبَ الأبيضَ منَ الدَّنسِ ، وأبدِلهُ دارًا خَيرًا مِن دارِهِ ، وأهلًا خَيرًا مِن أهلِهِ ، وزَوجًا خَيرًا مِن زَوجِهِ ، وأدخِلهُ الجنَّةَ ونجِّهِ منَ النَّارِ ـ أو قالَ ـ : وأَعِذْهُ مِن عذابِ القبرِ"
        }
        englishText="صحيح النسائي"
        number={0}
        type="death"
      />
      <NamesContaienr>
        <h3 onClick={(e) => alert("ok")}>أضف أسم </h3>
        <div
          className="flex-contaienr"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {names.map((el, idx) => {
            return (
              <CardSurah
                key={idx}
                number={idx}
                name={el.name}
                englishName={el.date}
                type={"death"}
              />
            );
          })}
        </div>
      </NamesContaienr>
    </div>
  );
};

const NamesContaienr = styled.div`
  h3 {
    cursor: pointer;
    width: fit-content;
    padding: 10px 5px;
    border-bottom: 2px solid ${colors.main};
    &:hover {
      color: #fff;
      background: ${colors.main};
    }
  }
  margin: 50px auto;
  direction: rtl;
  .flex-contaienr {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;
const HadithHeader = styled.div`
  direction: rtl;
  cursor: pointer;
  margin: 25px 0;
  h5 {
    direction: rtl;
    width: fit-content;
    padding: 10px 10px;
    border-bottom: 2px solid ${colors.main};
    &:hover {
      background: ${colors.main};
      color: #fff;
    }
  }
`;

export default Tzkar;
