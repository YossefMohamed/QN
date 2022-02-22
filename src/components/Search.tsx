import React, { FC, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
export const SearchComp: FC = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const searchOnClick = (e: any) => {
    e.preventDefault();
    if (keyword.length) navigate("/search/" + keyword);
  };
  return (
    <SearchContiner>
      <div className="title">ابحث عن كلمة في سورة</div>

      <img src="qn.png" className="search-img" alt="search" loading="lazy" />

      <form className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="الكلمة ..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={searchOnClick}>
          <i className="fa fa-search"></i>
        </button>
      </form>
    </SearchContiner>
  );
};

const SearchContiner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  min-height: 350px;
  direction: rtl;

  .search-img {
    width: 40%;
    margin: 20px 0;
  }

  .search-form {
    display: flex;
    justify-content: center;
    .search-input {
      outline: none;
      padding: 5px 10px;
      border: none;
      background: rgba(61, 116, 54, 0.124);
    }
    button {
      outline: none;
      border: none;
      padding: 7px 15px;
      background: rgba(86, 167, 75, 0.823);
      color: white;
    }
  }
  @media (max-width: 768px) {
    .search-input {
      padding: 5px 3px !important;
      width: 70%;
    }
    .search-img {
      width: 70%;
    }
  }
`;
