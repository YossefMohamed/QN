import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Ayah from "../components/Ayah";
import { Loader } from "../components/Loader";
import { Titlehadith } from "../components/styled-components/homePage";
import { colors, sizes } from "../constant";
import { getFavs } from "../store/favSlice";
import { startMedia, stopMedia } from "../store/mediaSlice";
import { Rootstate } from "../store/store";
export const Surah: FC = () => {
  let params = useParams();
  const dispatch = useDispatch();

  const [ayahsEn, setAyahsEn] = useState<any[]>([]);
  const [ayahs, setAyahs] = useState<any[]>([]);
  const [ayahsNumber, setAyahsNumber] = useState<number>(0);
  const [surahName, setSurahName] = useState<{
    name: string;
    englishName: string;
    number: number;
  }>({
    name: "",
    englishName: "",
    number: 0,
  });
  const [tafsser, setTafsser] = useState<
    {
      number: number;
      text: string;
    }[]
  >([]);
  const [currNumber, setCurrNumber] = useState(0);
  useEffect(() => {
    dispatch(getFavs());
  }, []);
  useLayoutEffect(() => {
    fetch(
      "https://api.alquran.cloud/v1/surah/" +
        (Number(params.id) + 1) +
        "/editions/quran-uthmani,en.asad?"
    )
      .then((response) => response.json())
      .then((data) => {
        setAyahsNumber(data.data[0].numberOfAyahs);

        setSurahName({
          name: data.data[0].name,
          englishName: data.data[0].englishName,
          number: data.data[0].numberOfAyahs,
        });
        setAyahsEn((prev) => {
          if (typeof data.data[1].ayahs !== "string")
            return [...prev, ...data.data[1].ayahs];
          else return [...prev];
        });
        setAyahs((prev) => {
          if (typeof data.data[0].ayahs !== "string")
            if (prev.length)
              return Array.from(new Set(prev.concat(data.data[0].ayahs)));
            else return Array.from(new Set(data.data[0].ayahs));
          else return prev;
        });
      });
    return () => {
      dispatch(stopMedia());
    };
  }, [params.id]);
  const tafsserAppear = () => {
    fetch(
      "https://api.alquran.cloud/v1/surah/" +
        (Number(params.id) + 1) +
        "/ar.muyassar"
    )
      .then((res) => res.json())
      .then((data) => setTafsser(data.data.ayahs));
  };
  const changeCurrNumber = () => {
    setCurrNumber((prev) => {
      return prev + 10;
    });
  };
  const infinityScrollRef = useRef<any>();
  useEffect(() => {
    let observer = new IntersectionObserver((e, observer) => {
      if (surahName.name.length && e[0].isIntersecting) {
        e[0].isIntersecting && changeCurrNumber();
      }
    });
    infinityScrollRef.current && observer.observe(infinityScrollRef.current);
  }, [infinityScrollRef, surahName.name.length]);
  const mediaData = useSelector((state: Rootstate) => state.media);

  const navigate = useNavigate();
  return (
    <div className="my-5">
      {mediaData.type && (
        <audio
          controls
          style={{ display: "none" }}
          src={mediaData.mediaURL}
          autoPlay
          onEnded={(e) => {
            dispatch(stopMedia());
            if (mediaData.numberOfAyahs > mediaData.number) {
              dispatch(
                startMedia({
                  number: mediaData.number + 1,
                  surah: Number(params.id),
                  type: "ayah",
                })
              );
            }
          }}
        ></audio>
      )}
      <Titlehadith onClick={() => navigate("/surah")}>
        الرجوع لاختيار سورة اخري
      </Titlehadith>
      {surahName.name.length ? (
        <SurahTitle>
          <div className="surah-name__en">{surahName.englishName}</div>
          <div className="surah-name__ar">{surahName.name}</div>
          <div className="surah-tools">
            <div aria-label="as">
              <button onClick={tafsserAppear}>
                <i className="fa fa-comment"></i>
              </button>
            </div>
            <div>
              <button
                onClick={(e) => {
                  if (!mediaData.type) {
                    dispatch(stopMedia());
                    dispatch(
                      startMedia({
                        type: "surah",
                        surah: Number(params.id),
                        number: 1,
                      })
                    );
                  } else {
                    dispatch(stopMedia());
                  }
                }}
              >
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
          <h1 key={ayah.text + idx}>
            <Ayah
              tafsser={tafsser.length ? tafsser[idx].text : ""}
              text={ayah.text}
              surahName={surahName.name}
              surah={Number(params.id)}
              number={ayah.numberInSurah}
              key={idx}
              englishText={ayahsEn[idx].text}
            />
          </h1>
        ))}
      {ayahs.length < ayahsNumber && (
        <div ref={infinityScrollRef}>
          <Loader />
        </div>
      )}
    </div>
  );
};

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
const SurahTitle = styled.div`
  width: 100%;
  padding: 0px 0;
  min-height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .surah-name__en {
    width: 50%;
  }
  .surah-name__ar {
    width: 50%;

    direction: rtl;
  }
  font-size: calc(${sizes.big} - 5px);
  .surah-tools {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    button {
      width: 40px;
      font-size: ${sizes.small};
      height: 40px;
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
    .fav-button button:hover {
      background: rgb(178 178 178);
      border: rgb(178 178 178);
      color: rgb(255 200 0);
    }
  }
`;
