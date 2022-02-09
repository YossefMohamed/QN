import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { Card } from "../components/Card";
import { Loader } from "../components/Loader";
import { SearchComp } from "../components/Search";

export const HomePage = () => {
  let params = useParams();
  const [surahs, setSurahs] = useState<any[]>([]);
  useEffect(() => {
    fetch("http://api.alquran.cloud/v1/meta")
      .then((response) => response.json())
      .then((data) => setSurahs(data.data.surahs.references));
  }, []);
  return (
    <div>
      <HomeContainer>
        <Card
          path="/k3ba.jpg"
          title="القران الكريم"
          content="القرائة والاستماع الي القران الكريم"
        />
        <Card
          path="/nabawy.jpg"
          title="السنة"
          content="حديث النبي الكريم صلي الله عليه وسلم"
        />
      </HomeContainer>
      <SearchComp />
      {surahs.length ? (
        surahs.map((surah, idx) => <h1 key={idx}>{surah.name}</h1>)
      ) : (
        <Loader />
      )}
    </div>
  );
};

const HomeContainer = styled.div`
  margin: 5rem 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  justify-content: space-between;
`;
