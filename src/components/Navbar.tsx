import React from "react";
import styled from "styled-components";
import { sizes } from "../constant";
export const Navbar = () => (
  <Container>
    <Logo>
      <div className="bars">
        <i className="fa fa-bars"></i>
      </div>
      <div className="logo">QN</div>
    </Logo>
    <List>
      <li>دخول</li>
      <li>تسجيل</li>
      <li>ساعدنا</li>
    </List>
  </Container>
);

const List = styled.ul`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  flex: end;
  font-size: ${sizes.normal};
  justify-content: end;
  & li {
    margin: 15px;
    list-style: none;
  }
`;
const Container = styled.div`
  display: flex;
  position: sticky;
  height: 5rem;
  font-size: 2rem;
  padding: 5px 15px;
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
    display: flex;
  }
  .logo {
    font-family: "Reem Kufi";
    font-size: ${sizes.normal};

    margin-left: 30px;
    font-size: 1.75rem;
    color: rgb(61, 116, 54);
  }
`;
