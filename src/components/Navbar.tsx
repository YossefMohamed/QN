import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { colors, sizes } from "../constant";
import { signout } from "../store/authSlice";
import { Rootstate } from "../store/store";
export const Navbar = () => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState<boolean>(false);
  const [favList, setFavList] = useState<boolean>(false);
  const auth = useSelector((state: Rootstate) => state.auth);
  const dispatch = useDispatch();

  return (
    <Container favList={favList}>
      <Logo>
        <div className="bars" onClick={(e) => setDisplay((prev) => !prev)}>
          <i className="fa fa-bars"></i>
        </div>
        <div className="logo" onClick={(e) => navigate("/")}>
          QN
        </div>
      </Logo>
      <List>
        {Object.values(auth.user).length ? (
          <li
            onClick={(e) => {
              dispatch(signout());
            }}
          >
            الخروج
          </li>
        ) : (
          ""
        )}
        {!Object.values(auth.user).length ? (
          <li
            onClick={(e) => {
              setDisplay(false);
              navigate("/signin");
            }}
          >
            دخول
          </li>
        ) : (
          ""
        )}
        <li
          onClick={(e) => {
            setDisplay(false);
            navigate("/prayertime");
          }}
        >
          مواقيت الصلاة
        </li>

        <li
          onClick={(e) => {
            setDisplay(false);
            navigate("/blog");
          }}
        >
          المدونة{" "}
        </li>

        {!Object.values(auth.user).length ? (
          <li
            onClick={(e) => {
              setDisplay(false);
              navigate("/signup");
            }}
          >
            تسجيل
          </li>
        ) : (
          <li onClick={(e) => {}}>
            <span onClick={(e) => navigate("/favorite-ayahs")}>
              ألايات المفضله
            </span>
          </li>
        )}
        <li
          onClick={(e) => {
            setDisplay(false);
            navigate("/remember-us");
          }}
        >
          تذكرنا
        </li>
      </List>
      <ListMedia display={display.toString()}>
        {!Object.values(auth.user).length ? (
          <li
            onClick={(e) => {
              setDisplay(false);
              navigate("/signin");
            }}
          >
            دخول
          </li>
        ) : (
          ""
        )}
        <li
          onClick={(e) => {
            setDisplay(false);
            navigate("/prayertime");
          }}
        >
          مواقيت الصلاة
        </li>
        <li
          onClick={(e) => {
            setDisplay(false);
            navigate("/blog");
          }}
        >
          المدونة{" "}
        </li>
        {!Object.values(auth.user).length ? (
          <li
            onClick={(e) => {
              setDisplay(false);
              navigate("/signup");
            }}
          >
            تسجيل
          </li>
        ) : (
          ""
        )}
        <li
          onClick={(e) => {
            setDisplay(false);
            navigate("/remember-us");
          }}
        >
          تذكرنا
        </li>
        <li onClick={(e) => {}}>
          <span onClick={(e) => navigate("/favorite-ayahs")}>
            ألايات المفضله
          </span>
        </li>
        {Object.values(auth.user).length ? (
          <li
            onClick={(e) => {
              dispatch(signout());
            }}
          >
            الخروج
          </li>
        ) : (
          ""
        )}
      </ListMedia>
    </Container>
  );
};

const ListMedia = styled.li<{ display: string }>`
  position: absolute;
  top: 100%;
  left: 0;
  box-shadow: 10px 10px 5px -2px rgba(0, 0, 0, 0.2);

  display: ${(props) => (props.display !== "false" ? "flex" : "none")};
  width: 100%;
  flex-direction: column;
  list-style: none;
  font-size: ${sizes.normal};
  border: 2px solid ${colors.main};
  background: #fff;

  li {
    padding: 15px 20px;
    cursor: pointer;
    &:hover {
      color: #fff;
      background: ${colors.main};
    }
  }
`;

const List = styled.ul`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  flex: end;
  font-size: ${sizes.normal};
  justify-content: end;
  & li {
    padding: 0 5px;
    cursor: pointer;
    margin: 15px;
    border-bottom: solid 2px transparent;

    list-style: none;
    &:hover {
      border-bottom: solid 2px ${colors.main};
    }
  }
  @media (max-width: 850px) {
    display: none;
  }
`;

const Container = styled.div<{ favList: boolean }>`
  .favorite-item {
  }
  .favorite-list {
    position: absolute;
    width: 50px;
    box-shadow: 0 2px 5px -2px rgb(0 0 0 / 20%);
    top: 85%;
    transform: translateX(-50%);
    padding: 0;
    margin: 10px 0;
    width: 200px;
    background-color: #fff;
    display: ${(props) => (props.favList ? "flex" : "none")};
    justify-content: center;
    flex-direction: column;
    li {
      box-sizing: border-box;
      padding: 10px;
      margin: 0;
      width: 100%;
    }
  }
  .favorite-list-media {
    list-style: none;
    padding: 0;
    display: ${(props) => (props.favList ? "flex" : "none")};
    flex-direction: column;
    li {
      box-sizing: border-box;
      padding: 10px 50px;
      margin: 0;
      width: 100%;
    }
  }
  position: relative;
  box-sizing: content-box;
  display: flex;
  position: sticky;
  top: 0;
  z-index: 90000000 !important;
  background: #fff;
  height: 3.5rem;
  font-size: 2rem;
  padding: 15px 15px;
  box-shadow: 0 2px 5px -2px rgba(0, 0, 0, 0.2);
`;
const Logo = styled.div`
  width: 25%;

  font-size: ${sizes.normal};
  height: 100%;
  align-items: center;

  display: flex;
  padding-left: 10px;
  .bars {
    display: none;
    cursor: pointer;
  }
  .logo {
    font-family: "Reem Kufi";
    font-size: ${sizes.normal};
    cursor: pointer;
    font-weight: bolder;
    margin-left: 30px;
    font-size: 1.75rem;
    color: rgb(61, 116, 54);
  }
  @media (max-width: 850px) {
    .bars {
      display: flex;
      cursor: pointer;
    }
    width: 100%;
    justify-content: space-between;
  }
`;
