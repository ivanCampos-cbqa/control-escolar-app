import { ERROR_MESSAGES } from '@constants';
import { ValidationSchema, CalificacionEditFormFields } from '@interfaces';
import { onlyNumbersRegex } from '@utils';

export const calificacionEditFormValidationSchema: ValidationSchema<CalificacionEditFormFields> = {
  calificacion:{
    required: ERROR_MESSAGES.REQUIRED_FIELD,
    pattern: {
      value: onlyNumbersRegex,
      message: ERROR_MESSAGES.INVALID_CALIFICACIÓN,
    },
  },
};