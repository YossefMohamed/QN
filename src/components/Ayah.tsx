import { FC, useEffect, useRef, useState } from "react";
import { RiPauseMiniFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { colors, sizes } from "../constant";
import { addFav } from "../store/favSlice";
import { startMedia, stopMedia } from "../store/mediaSlice";
import { Rootstate } from "../store/store";
type AyahProps = {
  text: string;
  number: number;
  englishText: string;
  tafsser?: string;
  type?: string;
  surah?: number;
};
const Ayah: FC<AyahProps> = ({
  text,
  number = 0,
  englishText,
  tafsser,
  type,
  surah = 0,
} = defaultProps) => {
  const [tafsserAyah, setTafsserAyah] = useState<string>(
    tafsser ? tafsser : ""
  );
  const mediaData = useSelector((state: Rootstate) => state.media);
  const user = useSelector((state: Rootstate) => state.auth.user);

  const dispatch = useDispatch();
  const [audio, setAudio] = useState({
    playing:
      mediaData.type &&
      Number(mediaData.number - 1) === number - 1 &&
      mediaData.surahNumber === Number(surah) + 1
        ? true
        : false,
  });
  useEffect(() => {
    setTafsserAyah(tafsser ? tafsser : "");
  }, [tafsser]);
  useEffect(() => {
    setAudio({
      playing:
        mediaData.type &&
        Number(mediaData.number - 1) === number - 1 &&
        mediaData.surahNumber === Number(surah) + 1
          ? true
          : false,
    });
  }, [mediaData, number, surah]);
  const tafsserAppear = () => {
    if (!tafsserAyah) {
      fetch(
        "https://api.alquran.cloud/v1/surah/" +
          (surah + 1) +
          "/ar.muyassar?" +
          `offset=${number - 1}&limit=${1}`
      )
        .then((res) => res.json())
        .then((data) => {
          setTafsserAyah(data.data.ayahs[0].text);
        });
    } else {
      setTafsserAyah("");
    }
  };
  console.log(
    user.favorite.map((fav: any) => fav.text === text && fav.surah === surah)
  );
  return (
    <AyahContainer
      playing={
        mediaData.type &&
        Number(mediaData.number - 1) === number - 1 &&
        mediaData.surahNumber === Number(surah) + 1
          ? true
          : false
      }
    >
      <div className="ayah-number">
        {type !== "death" && <div className="number">{number}</div>}

        <div className="surah-tools">
          <div
            className={`fav-button ${
              !!!user.favorite
                .map((fav: any) => fav.text === text && fav.surah === surah)
                .indexOf(true)
                ? "fav--hovered"
                : ""
            }`}
          >
            {type !== "death" && (
              <button
                onClick={(e) =>
                  dispatch(
                    addFav({
                      text,
                      number,
                      englishText,
                      tafsser,
                      type,
                      surah,
                      user: user._id,
                    })
                  )
                }
                disabled={
                  !!!user.favorite
                    .map((fav: any) => fav.text === text && fav.surah === surah)
                    .indexOf(true)
                }
              >
                <i className="fa fa-star"></i>
              </button>
            )}
          </div>
          {!type && (
            <>
              <div>
                <button onClick={tafsserAppear}>
                  <i className="fa fa-comment"></i>{" "}
                </button>
              </div>
              <div>
                <button
                  onClick={(e) => {
                    dispatch(stopMedia());

                    if (!audio.playing) {
                      dispatch(
                        startMedia({
                          number: number,
                          surah: surah,
                          type: "ayah",
                        })
                      );
                      setAudio((prev) => {
                        return { ...prev, playing: true };
                      });
                    } else {
                      dispatch(stopMedia());
                      setAudio((prev) => {
                        return { ...prev, playing: false };
                      });
                    }
                  }}
                >
                  {!audio.playing ? (
                    <i className="fa fa-play"></i>
                  ) : (
                    <RiPauseMiniFill />
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="ayah-text__ar">{text}</div>
      {!type && <div className="ayah-text__en">{englishText}</div>}
      {type === "death" && <div className="ayah-text__en">{englishText}</div>}
      {tafsserAyah && (
        <div className="ayah-text__ar tafsser">{tafsserAyah}</div>
      )}
    </AyahContainer>
  );
};

const defaultProps: AyahProps = {
  text: "جاري التحميل ......",
  number: 0,
  englishText: "Loading....",
  tafsser: "",
};

const AyahContainer = styled.div<{ playing: boolean }>`
  font-family: "Amiri" !important;

  .ayah-number {
    padding: 5px;
    display: flex;

    .number {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .surah-tools {
      width: 100%;
      display: flex;
      padding: 0;
      margin: 5px 0;
      opacity: 0;
      justify-content: flex-end;
      button {
        width: 28px;
        font-size: 10px;
        height: 28px;
        outline: none;
        border-radius: 50%;
        margin: 0 0 0 15px;
        background: ${colors.main};

        border: 2px solid ${colors.main};
        color: white;
        &:hover {
          background: rgb(278 278 278);
          opacity: 1;

          color: ${colors.main};
        }
        .fav-button button:hover {
          background: rgb(178 178 178);
          border: rgb(178 178 178);
          color: rgb(255 200 0);
        }
      }
    }
  }

  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  &:hover {
    background: rgb(86, 167, 75, 0.82);
    color: #fff;
  }
  color: ${({ playing }) => (playing ? "#fff" : "#000")};
  background-color: ${({ playing }) =>
    playing ? "rgb(86, 167, 75, 0.82)" : "#fff"};

  border-bottom: 2px solid gray;
  min-height: 50px;
  font-size: ${sizes.normal};
  .ayah-text__ar {
    direction: rtl;
    line-height: 2.5rem;
    font-size: calc(${sizes.normal} + 2px);
  }
  .ayah-text__en {
    font-size: calc(${sizes.normal} + 2px);
  }
  &:hover {
    .surah-tools {
      opacity: 1;
    }
    .fav-button button:hover {
      background: rgb(178 178 178);
      border: rgb(178 178 178);
      color: rgb(255 200 0);
    }
  }
  .tafsser {
    font-size: calc(${sizes.small} + 2px);
  }
  .fav--hovered button {
    background: rgb(178 178 178) !important;
    border: rgb(178 178 178) !important;
    color: rgb(255 200 0) !important;
  }

  @media (max-width: 1039px) {
    font-size: ${sizes.small};
    .ayah-text__ar {
      direction: rtl;
      line-height: 2.5rem;
      font-size: calc(${sizes.small} + 2px);
    }
    .ayah-text__en {
      font-size: calc(${sizes.small} + 2px);
    }
  }
`;

export default Ayah;
