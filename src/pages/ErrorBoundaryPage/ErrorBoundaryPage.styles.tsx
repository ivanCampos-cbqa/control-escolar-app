import { styled } from 'styled-components';

import { colors, fontSizes, spacing } from '@constants';
// import { ErrorBoundaryImage } from 'src/assets/img';

export const PageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
`;

// export const ErrorBoundaryImageStyled = styled(ErrorBoundaryImage)`
//   width: 30rem;
//   max-width: 40rem;
//   height: 30rem;
//   max-height: 30rem;
// `;

export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const TextErrorTitle = styled.div`
  font-size: 4rem;
  font-weight: bold;
  color: ${colors.black};
  margin: ${spacing.small} 0;
`;

export const CodeTextError = styled.code`
  background-color: ${colors.lightGray};
  padding: ${spacing.minimal};
  margin-bottom: ${spacing.medium};
  border-radius: ${spacing.small};
  max-width: 60rem;
  font-size: ${fontSizes.sm};
  font-weight: normal;
`;
