import styled from "styled-components";
import { colors } from "@constants";


export const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 10%;
  padding: 20px;
  background-color: ${colors.lighterBlue};
  border-radius: 10px;
  box-shadow: 0 4px 10px ${colors.lightGray};
  height: inherit;
`;

export const Title = styled.h3`
  text-align: center;
  color: ${colors.darkBlue};
  margin-top: 0px;
  margin-bottom: 0px;
`;

export const Section = styled.div`
  margin-bottom: 20px;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
  background-color: ${colors.white};
  border-radius: 10px;
  box-shadow: 0 2px 5px ${colors.lightGray};
`;

export const ListItem = styled.li`
  padding: 10px 15px;
  border-bottom: 4px solid ${colors.lightGray};
  display: flex;
  flex-direction: column;
  gap: 5px;

  &:last-child {
    border-bottom: none;
  }

  strong {
    color: ${colors.darkBlue};
    font-size: 1rem;
  }

  span {
    color: ${colors.midGray};
    font-size: 0.9rem;
  }
`;