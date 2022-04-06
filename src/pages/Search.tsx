import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Ayah from "../components/Ayah";
import { Loader } from "../components/Loader";
import { colors } from "../constant";

export const Search = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [ayahs, setAyahs] = useState<any>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch(
      "https://api.alquran.cloud/v1/search/" +
        params.id +
        "/all/quran-simple-clean"
    )
      .then((res) => res.json())
      .then((data) => setAyahs(data.data))
      .catch((e) => {
        setError(true);
      });
  }, []);

  return (
    <div>
      <HadithHeader className="hadith--header">
        <h5 onClick={() => navigate("/surah")}>الرجوع لاختيار سورة </h5>
      </HadithHeader>
      {!error ? (
        ayahs.matches ? (
          ayahs.matches.map((el: any, idx: number) => (
            <div key={idx}>
              <h5
                onClick={(e) => navigate("/surah/" + (el.surah.number - 1))}
                style={{
                  padding: "20px 0 0",
                  direction: "rtl",
                  cursor: "pointer",
                }}
              >
                {" "}
                اذهب الي سورة {el.surah.name}
              </h5>
              <Ayah
                text={el.text}
                number={idx + 1}
                englishText={`${el.surah.name} ${el.numberInSurah}`}
              />
            </div>
          ))
        ) : (
          <Loader />
        )
      ) : (
        <h3
          style={{ padding: "250px 0", textAlign: "center", direction: "rtl" }}
        >
          لا يوجد نتائج ....{" "}
        </h3>
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
`;
