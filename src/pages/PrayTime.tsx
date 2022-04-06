import React, { useEffect, useState } from "react";
import { Last } from "react-bootstrap/esm/PageItem";
import styled from "styled-components";
import { colors, sizes } from "../constant";
import { useParams, useNavigate } from "react-router-dom";

import {
  BsFillMoonFill,
  BsFillSunFill,
  BsFillSunriseFill,
} from "react-icons/bs";
import * as _ from "lodash";
import { RiSunFoggyFill } from "react-icons/ri";
import { Loader } from "../components/Loader";
export const PrayTime = () => {
  const navigate = useNavigate();
  const [timing, setTiming] = useState<any>({});
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      fetch(
        "https://api.aladhan.com/v1/calendar?latitude=" +
          position.coords.latitude +
          "&longitude=" +
          position.coords.longitude +
          "&method=4&month=" +
          (new Date().getUTCMonth() + 1) +
          "&" +
          new Date().getUTCFullYear()
      )
        .then((response) => response.json())
        .then((data) => {
          setTiming(
            _.pick(data.data[new Date().getDate() - 1].timings, [
              "Fajr",
              "Dhuhr",
              "Asr",
              "Sunrise",
              "Maghrib",
              "Isha",
            ])
          );
        });
    });
  }, []);
  return (
    <>
      <HadithHeader className="hadith--header">
        <h5 onClick={() => navigate("/")}>الرجوع للرئيسية</h5>
      </HadithHeader>
      {timing.Asr ? (
        <PrayTimeContainer>
          <PrayerItem>
            <div className="prayer-icon">
              <i className="fa fa-sun"></i>
            </div>
            <div className="prayer-name">الفجر</div>
            <div className="prayer-time">{timing.Fajr.split(" ")[0]}</div>
          </PrayerItem>{" "}
          <PrayerItem>
            <div className="prayer-icon">
              <BsFillSunriseFill />{" "}
            </div>
            <div className="prayer-name">الشروق</div>
            <div className="prayer-time">{timing.Sunrise.split(" ")[0]}</div>
          </PrayerItem>{" "}
          <PrayerItem>
            <div className="prayer-icon">
              <BsFillSunFill />
            </div>
            <div className="prayer-name">الظهر</div>
            <div className="prayer-time">{timing.Dhuhr.split(" ")[0]}</div>
          </PrayerItem>{" "}
          <PrayerItem>
            <div className="prayer-icon">
              <RiSunFoggyFill />
            </div>
            <div className="prayer-name">العصر</div>
            <div className="prayer-time">{timing.Asr.split(" ")[0]}</div>
          </PrayerItem>{" "}
          <PrayerItem>
            <div className="prayer-icon">
              <RiSunFoggyFill />
            </div>
            <div className="prayer-name">المغرب</div>
            <div className="prayer-time">{timing.Maghrib.split(" ")[0]}</div>
          </PrayerItem>{" "}
          <PrayerItem>
            <div className="prayer-icon">
              <BsFillMoonFill />
            </div>
            <div className="prayer-name">العشاء</div>
            <div className="prayer-time">{timing.Isha.split(" ")[0]} </div>
          </PrayerItem>
        </PrayTimeContainer>
      ) : (
        <Loader />
      )}
    </>
  );
};
const HadithHeader = styled.div`
  direction: rtl;
  cursor: pointer;
  margin: 50px 0;
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

const PrayTimeContainer = styled.div`
  overflow: hidden;
  direction: rtl;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.05);
  padding: 25px 5px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 90%;
  min-height: 500px;
  margin: 50px auto;
  .praytime-header {
    flex: 1;
    display: flex;
    min-height: 130px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.05);
    margin-bottom: 10px;
    width: 100%;
    .header__clock {
      width: 15%;
      justify-content: center;

      font-size: 65px;
      color: ${colors.main};
      display: flex;
      align-items: center;
    }
    .header__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: ${sizes.small};
      .info-time {
        padding: 0;
        height: fit-content;
        font-size: ${sizes.big};
        color: ${colors.main};
      }
      .info-remaining {
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
`;
const PrayerItem = styled.div`
  width: 100%;
  min-height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  color: ${colors.main};
  font-size: calc(${sizes.big});
  margin: 5px 0 0;
  .prayer-name {
    text-align: center;
    flex: 1;
  }
  .prayer-icon {
    font-size: 55px;
    display: flex;
    width: 15%;
    justify-content: center;
    align-items: center;
  }
  &:hover {
    color: white;
    background: ${colors.main};
  }
  .prayer-time {
    font-size: calc(${sizes.normal});

    padding-left: 25px;
  }
`;
