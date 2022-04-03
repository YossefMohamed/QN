import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ayah from "../components/Ayah";
import { Loader } from "../components/Loader";
import { Titlehadith } from "../components/styled-components/homePage";
import { getFavs } from "../store/favSlice";
import { Rootstate } from "../store/store";
import { useParams, useNavigate } from "react-router-dom";

const AyahFav = () => {
  const dispatch = useDispatch();
  const favs = useSelector((state: Rootstate) => state.fav);
  const mediaData = useSelector((state: Rootstate) => state.media);
  const auth = useSelector((state: Rootstate) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(Object.values(auth.user).length);
    if (Object.values(auth.user).length) {
      dispatch(getFavs());
    } else {
      navigate("/signin");
    }
  }, [auth, dispatch, navigate]);

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
          <>
            <h3
              onClick={(e) => navigate("/surah/" + aya.surah)}
              style={{
                padding: "20px 0 0",
                direction: "rtl",
                cursor: "pointer",
              }}
            >
              {" "}
              اذهب الي سورة {aya.surahName}
            </h3>
            <Ayah
              text={aya.text}
              englishText={aya.englishText}
              number={aya.number}
              surah={Number(aya.surah)}
            />
          </>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default AyahFav;