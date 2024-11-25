import { colors, spacing } from "@constants";
import styled from "styled-components";

export const PageWrapper = styled.section`
  background-color: ${colors.offWhite};
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoginError = styled.p`
  color: red;
  font-size: 1rem;
  margin-top: 0.5rem;
`

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.medium};
`