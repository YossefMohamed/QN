import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Ayah from "../components/Ayah";
import { Loader } from "../components/Loader";
import { colors, sizes } from "../constant";
export const Surah: FC = () => {
  let params = useParams();
  const [ayahsEn, setAyahsEn] = useState<any[]>([]);
  //http://api.alquran.cloud/v1/surah/2/ar.alafasy?offset=1&limit=2
  const [ayahs, setAyahs] = useState<any[]>([]);
  const [surahName, setSurahName] = useState<{
    name: string;
    englishName: string;
  }>({
    name: "",
    englishName: "",
  });
  useEffect(() => {
    fetch("http://api.alquran.cloud/v1/surah/" + params.id + "/en.asad")
      .then((response) => response.json())
      .then((data) => {
        setAyahsEn(data.data.ayahs);
      });

    fetch("http://api.alquran.cloud/v1/surah/" + params.id + "/ar.alafasy")
      .then((response) => response.json())
      .then((data) => {
        setSurahName({
          name: data.data.name,
          englishName: data.data.englishName,
        });

        setAyahs(data.data.ayahs);
      });
  }, []);

  return (
    <div className="my-5">
      {surahName.name.length ? (
        <SurahTitle>
          <div className="surah-name__en">{surahName.englishName}</div>
          <div className="surah-name__ar">{surahName.name}</div>
          <div className="surah-tools">
            <div className="fav-button">
              <button>
                <i className="fa fa-star"></i>
              </button>
            </div>
            <div aria-label="as">
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
        </SurahTitle>
      ) : (
        <Loader />
      )}
      {!!(ayahs.length & ayahsEn.length) &&
        ayahs.map((ayah, idx) => (
          <h1 key={idx}>
            <Ayah
              text={ayah.text}
              number={ayah.number}
              key={idx}
              englishText={ayahsEn[idx].text}
              audio={ayah.audio}
            />
          </h1>
        ))}
    </div>
  );
};

const SurahTitle = styled.div`
  width: 100%;
  margin: 20px 0;
  padding: 20px 0;
  min-height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .surah-name__en {
    width: 50%;
    min-height: 75px;
  }
  .surah-name__ar {
    width: 50%;

    min-height: 75px;
    direction: rtl;
  }
  font-size: ${sizes.big};
  .surah-tools {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    button {
      width: 45px;
      font-size: ${sizes.small};
      height: 45px;
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
    }
    .fav-button button:hover{
        background: rgb(178 178 178);
        border: rgb(178 178 178);
        color: rgb(255 200 0);
      }
    }
  }
`;
