import { ERROR_MESSAGES } from '@constants';
import { ValidationSchema, LoginFormFields } from '@interfaces';
import { matriculaRegex, emptySpacesRegex } from '@utils';

export const loginFormValidationSchema: ValidationSchema<LoginFormFields> = {
  matricula: {
    required: ERROR_MESSAGES.REQUIRED_FIELD,
    pattern: {
      value: matriculaRegex,
      message: ERROR_MESSAGES.INVALID_MATRICULA,
    },
    validate: (value) => {
      if (!emptySpacesRegex.test(value))
        return ERROR_MESSAGES.INVALID_WHITESPACES;
      return true;
    },
  },
  password: {
    required: ERROR_MESSAGES.REQUIRED_FIELD,
    pattern: {
      value: emptySpacesRegex,
      message: ERROR_MESSAGES.INVALID_WHITESPACES,
    },
  },
};