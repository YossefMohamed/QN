import React from "react";
import styled from "styled-components";
import Ayah from "../components/Ayah";
import { colors } from "../constant";

export const Profile = () => {
  return (
    <Container>
      <div className="header-img">
        <img src="nabawy.jpg" alt="nawabey" className="background" />
        <img
          className="avatar"
          src="https://avatars.dicebear.com/api/male/yossef-Mohamed.svg"
          alt="profile"
        />
      </div>
      <div className="content">
        <div className="list">
          <ul>
            <li>المفضله</li>
            <li>المفضله</li>
            <li>المفضله</li>
            <li>المفضله</li>
          </ul>
        </div>
        <div className="content__body">
          <Ayah
            englishText="asdadwda"
            text="شصيشصيشصيشصيشص شصيشص شصي شصي شصي شصي شصي صثب صث"
            number={2}
          />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin: 50px 0;
  direction: ltr;

  .header-img {
    width: 100%;
    height: 250px;
    position: relative;
    .background {
      width: 100%;
      height: 100%;
    }

    .avatar {
      position: absolute;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      top: 100%;
      left: 50%;
      transform: translate(-50%, -75%);
    }
    background: ${colors.main};
  }
  .content {
    display: flex;
    justify-content: flex-start;
    .list {
      width: 25%;
      display: flex;
      li {
        list-style: none;
        margin-top: 20px;
      }
    }
    .content__body {
      flex: 1;
    }
  }
`;
