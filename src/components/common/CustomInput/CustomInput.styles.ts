import styled, { css } from 'styled-components';

import { VisibilityIcon, VisibilityOffIcon } from '@assets/icons';
import { colors, fontSizes, spacing } from '@constants';

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: ${spacing.small};
`;

export const Label = styled.label<{ $fontSize?: string }>`
  font-size: ${({ $fontSize }) => ($fontSize ? $fontSize : fontSizes.xs)};
  color: ${colors.midGray};
  font-weight: 500;
`;

export const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;

interface InputProps {
  $hasValue?: boolean;
  disabled?: boolean;
}

const BaseInputStyles = css<InputProps>`
  width: 100%;
  height: 3.2rem;
  padding: ${spacing.minimal};
  padding-right: ${spacing.simple};
  padding-left: ${spacing.simple};
  background-color: ${({ disabled }) =>
    disabled ? colors.gray : 'transparent'};
  border: ${spacing.tiny} solid ${colors.gray};
  border-radius: 0.8rem;
  color: ${({ $hasValue, disabled }) =>
    $hasValue && disabled ? colors.midLightGray : colors.darkGray};
  font-size: ${fontSizes.sm};
  font-family: Manrope, sans-serif;

  &::placeholder {
    color: ${colors.midLightGray};
    font-size: 1rem;
  }
`;

export const Input = styled.input<InputProps>`
  ${BaseInputStyles}
`;

export const TextArea = styled.textarea<InputProps>`
  ${BaseInputStyles};
`;

export const EyeIcon = styled(VisibilityIcon)`
  position: absolute;
  height: 1rem;
  right: ${spacing.large};
  cursor: pointer;
`;

export const EyeOffIcon = styled(VisibilityOffIcon)`
  position: absolute;
  right: ${spacing.large};
  cursor: pointer;
`;

export const ErrorText = styled.span`
  color: ${colors.red};
  font-size: small;
  font-weight: 500;
`;
