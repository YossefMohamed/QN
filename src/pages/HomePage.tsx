import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Ayah from "../components/Ayah";
import { Card } from "../components/Card";
import CardSurah from "../components/CardSurah";
import { Loader } from "../components/Loader";
import { SearchComp } from "../components/Search";
import { Titlehadith } from "../components/styled-components/homePage";
import { Rootstate } from "../store/store";
import { getSurahs } from "../store/surahsSlice";

export const HomePage = () => {
  const [dailyHadith, setDailtHadith] = useState("");
  const dispatch = useDispatch();
  const surahsReducer = useSelector((state: Rootstate) => state.surahs);
  useEffect(() => {
    fetch(
      "https://api.hadith.gading.dev/books/" +
        "bukhari" +
        "?range=" +
        (new Date().getDate() + new Date().getMonth()) +
        "-" +
        (new Date().getDate() + new Date().getMonth())
    )
      .then((e) => e.json())
      .then((data) => {
        setDailtHadith(data.data.hadiths[0].arab);
      });

    !surahsReducer.surahs.length && dispatch(getSurahs());
  }, []);

  return (
    <div>
      <Titlehadith>حديث اليوم :</Titlehadith>
      {dailyHadith.length ? (
        <Ayah
          text={dailyHadith}
          englishText="صحيح البخاري"
          number={0}
          type="death"
        />
      ) : (
        <Loader />
      )}
      <HomeContainer>
        <Link className="card-link" to="/surah">
          <Card
            path="/k3ba.jpg"
            title="القران الكريم"
            content="القرائة والاستماع الي القران الكريم"
          />
        </Link>{" "}
        <Link className="card-link" to="/sunnah">
          <Card
            path="/nabawy.jpg"
            title="السنة"
            content="حديث النبي الكريم صلي الله عليه وسلم"
          />
        </Link>
        <Link className="card-link" to="/azkary">
          <Card
            path="/azkar.png"
            title="الاذكار"
            content="قرائة الاذكار المطلوبة"
          />
        </Link>
        <Link className="card-link" to="/prayertime">
          <Card
            path="/prayertime.png"
            title="أوقات الصلاة"
            content="أعرف أوقات الصلاة حسب موقعك الحالي"
          />
        </Link>
      </HomeContainer>
      <SearchComp />
      <CardSurahContainer>
        {surahsReducer.loading ? (
          <Loader />
        ) : (
          surahsReducer.surahs.map((surah, idx) => (
            <CardSurah
              key={idx}
              number={surah.number - 1}
              name={surah.name}
              type="surah"
              englishName={surah.englishName}
            />
          ))
        )}
      </CardSurahContainer>
    </div>
  );
};

const HomeContainer = styled.div`
  margin: 5rem 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .card-link {
    display: block;
    margin: 0px 0 50px;
    height: fit-content;
  }
  justify-content: space-around;

  @media (max-width: 1349px) {
    justify-content: center;
  }
`;

const CardSurahContainer = styled.div`
  margin: 50px 0;
  flex-wrap: wrap;
  justify-content: center;
  display: flex;
`;
