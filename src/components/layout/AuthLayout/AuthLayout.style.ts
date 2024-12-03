import { colors, fontSizes } from "@constants";
import styled from "styled-components";

export const AuthLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${colors.white};
`;

export const NavBar = styled.nav`
  width: 90%;
  height: 60px;
  background-color: ${colors.black};
  color: ${colors.white};
  display: flex;
  justify-content: space-around;
  align-items: center;
  justify-self: center;
  font-size: ${fontSizes.xxs};
  font-weight: 500;
  text-transform: uppercase;
  border-radius: 0 0 20px 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  p:hover {
      cursor: pointer;
      color: #92212D;
      transition: all 0.2s;
  }
`