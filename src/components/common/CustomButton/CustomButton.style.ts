import { colors } from "@constants";
import styled from "styled-components";

export const Button = styled.button`
  background-color: ${colors.green};
  color: white;
  padding: 15px 32px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  width: 100%;
`;