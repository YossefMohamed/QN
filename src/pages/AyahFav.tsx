import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ayah from "../components/Ayah";
import { Loader } from "../components/Loader";
import { Titlehadith } from "../components/styled-components/homePage";
import { getFavs } from "../store/favSlice";
import { Rootstate } from "../store/store";

const AyahFav = () => {
  const dispatch = useDispatch();
  const favs = useSelector((state: Rootstate) => state.fav);
  const mediaData = useSelector((state: Rootstate) => state.media);
  useEffect(() => {
    dispatch(getFavs());
  }, []);

  return (
    <div>
      {mediaData.type && (
        <audio
          controls
          style={{ display: "none" }}
          src={mediaData.mediaURL}
          autoPlay
        ></audio>
      )}
      <Titlehadith>الأيات المفضلة ⭐ :</Titlehadith>
      {!favs.loading ? (
        favs.fav.map((aya: any) => (
          <Ayah
            text={aya.text}
            englishText={aya.englishText}
            number={aya.number}
            surah={aya.surah}
          />
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default AyahFav;
