import styled from 'styled-components';

import { colors, fontSizes, spacing } from '@constants';
import { NotFoundPageImage } from 'src/assets/img';

export const PageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ImageSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${spacing.large};
`;

export const NotFoundImageStyled = styled(NotFoundPageImage)`
  width: 80rem;
  max-width: 30rem;
`;

export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const TextErrorTitle = styled.h1`
  font-size: ${fontSizes.xxxl};
  font-weight: bold;
  color: ${colors.black};
  margin: ${spacing.small} 0;
`;

export const TextErrorMessage = styled.div`
  font-size: ${fontSizes.md};
  font-weight: normal;
  color: ${colors.black};
  margin-bottom: ${spacing.medium};
`;
