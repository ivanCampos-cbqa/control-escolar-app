import styled from 'styled-components';

import { colors, shades, spacing } from '@constants';

export const SimpleLoaderWrapper = styled.div`
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalLoaderWrapper = styled(SimpleLoaderWrapper)`
  position: fixed;
  background-color: ${shades.darkGray_25};
  z-index: 1;
`;

interface SpinnerProps {
  $thickness?: string;
  $size?: string;
}

export const Spinner = styled.div<SpinnerProps>`
  border: ${({ $thickness }) => $thickness || spacing.small} solid transparent;
  border-radius: 50%;
  border-top: ${({ $thickness }) => $thickness || spacing.small} solid
    ${({ color }) => color || colors.blue};
  width: ${({ $size }) => $size || spacing.xxxl};
  height: ${({ $size }) => $size || spacing.xxxl};
  -webkit-animation: spin 800ms linear infinite; /* Safari */
  animation: spin 800ms linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
`;
