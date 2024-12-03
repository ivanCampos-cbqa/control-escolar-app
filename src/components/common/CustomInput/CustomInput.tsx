import { HTMLInputTypeAttribute, useState, KeyboardEvent } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import {
  Container,
  Input,
  Label,
  ErrorText,
  InputWrapper,
  EyeIcon,
  EyeOffIcon,
  TextArea,
} from './CustomInput.styles';

interface CustomInputProps {
  label?: string;
  register?: UseFormRegisterReturn;
  placeholder?: string;
  className?: string;
  error?: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  hasValue?: boolean;
  fontSize?: string;
  maxLength?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  color?: string,
}

export default function CustomInput({
  label,
  register,
  placeholder,
  className,
  error,
  type,
  disabled,
  hasValue,
  fontSize,
  maxLength,
  value,
  defaultValue,
  onChange,
  color,
}: CustomInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handlePassword = () => setShowPassword(!showPassword);

  const renderEyeIcon = () => {
    if (type !== 'password') return;
    const Icon = showPassword ? EyeOffIcon : EyeIcon;
    return <Icon onClick={handlePassword} role="button" />;
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    const char = e.key;

    // Prevent Enter key event
    if (char === 'Enter') e.preventDefault();

    if (type === 'tel') {
      if (
        !/^\d$/.test(char) &&
        char !== '+' &&
        char !== 'Backspace' &&
        char !== 'Delete' &&
        char !== 'ArrowLeft' &&
        char !== 'ArrowRight'
      ) {
        e.preventDefault();
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange && event.target instanceof HTMLInputElement) {
      onChange(event as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <Container>
      <Label className={className} $fontSize={fontSize} color={color}>
        {label}
        <InputWrapper >
          {type === 'textarea' ? (
            <TextArea
              placeholder={placeholder}
              disabled={disabled}
              role="textbox"
              value={value}
              defaultValue={defaultValue}
              onChange={handleChange}
              {...register}
              $hasValue={hasValue}
              maxLength={maxLength}
            />
          ) : (
            <Input
              placeholder={placeholder}
              type={showPassword && type === 'password' ? 'text' : type}
              value={value}
              defaultValue={defaultValue}
              onChange={onChange}
              disabled={disabled}
              role="textbox"
              onKeyUp={handleKeyPress}
              onKeyDown={handleKeyPress}
              {...register}
              $hasValue={hasValue}
              maxLength={maxLength}
              color={color}
            />
          )}
          {renderEyeIcon()}
        </InputWrapper>
      </Label>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
}
