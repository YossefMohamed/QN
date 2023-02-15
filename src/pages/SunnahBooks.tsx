import React, { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Ayah from "../components/Ayah";
import { Loader } from "../components/Loader";
import { colors } from "../constant";
import { useParams } from "react-router-dom";
import { Titlehadith } from "../components/styled-components/homePage";

export const SunnahBooks: FC = (props) => {
  let params = useParams();

  const [hadith, setHadith] = useState<
    {
      number: number;
      arab: string;
      id: string;
    }[]
  >([]);
  const [currNumber, setCurrNumber] = useState(1);

  const infinityScrollRef = useRef<any>();
  useEffect(() => {
    let observer = new IntersectionObserver((e, observer) => {
      changeCurrNumber();
    });
    infinityScrollRef.current && observer.observe(infinityScrollRef.current);
  }, [infinityScrollRef.current]);
  const changeCurrNumber = () => {
    setCurrNumber((prev) => {
      return prev + 10;
    });
  };
  const [availabe, setAvailabe] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(
      "https://api.hadith.gading.dev/books/" +
        params.id +
        "?range=" +
        currNumber +
        "-10"
    )
      .then((e) => e.json())
      .then((data) => {
        setHadith([...hadith, ...data.data.hadiths]);
        setAvailabe(data.data.availabe);
      });
    // const changeCurrNumber = () => {
    //   setCurrNumber((prev) => {
    //     return prev + 10;
    //   });
    // };
    // const infinityScrollRef = useRef<any>();
    // useEffect(() => {
    //   let observer = new IntersectionObserver((e, observer) => {
    //     if (surahName.name.length && e[0].isIntersecting)
    //       e[0].isIntersecting && changeCurrNumber();
    //   });
    //   infinityScrollRef.current && observer.observe(infinityScrollRef.current);
    // }, [infinityScrollRef.current]);
  }, [currNumber]);
  return (
    <HadithContiner>
      <Titlehadith onClick={() => navigate("/sunnah")}>
        الرجوع لاختيار كتاب اخر
      </Titlehadith>

      {hadith.length ? (
        <>
          {hadith.map((el, idx) => (
            <Ayah
              key={idx}
              text={el.arab}
              number={el.number}
              englishText={""}
              type="hadith"
            />
          ))}
          <div ref={infinityScrollRef}>
            <Loader />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </HadithContiner>
  );
};

const HadithContiner = styled.div`
  margin: 50px 0;
  .hadith--header {
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
  }
`;
