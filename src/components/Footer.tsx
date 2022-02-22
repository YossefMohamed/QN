import React from "react";
import styled from "styled-components";
import { colors, sizes } from "../constant";

const Footer = () => {
  return <FooterContainer> صنع بواسطة يوسف محمد</FooterContainer>;
};

const FooterContainer = styled.div`
  border-top: 1px solid ${colors.main};
  text-align: center;
  padding: 20px;
  margin: 50px 0 5px;
  background: ${colors.main};
  color: #fff;
  font-size: ${sizes.normal};
`;
export default Footer;
