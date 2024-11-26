import { ERROR_MESSAGES } from '@constants';
import { ValidationSchema, MateriaCreateFormFields } from '@interfaces';
import { stringRegex } from '@utils';

export const materiaaCreateFormValidationSchema: ValidationSchema<MateriaCreateFormFields> = {
  nombre:{
    required: ERROR_MESSAGES.REQUIRED_FIELD,
  },
  codigoMateria:{
    required: ERROR_MESSAGES.REQUIRED_FIELD,
  },
  nombreProfesor:{
    required: ERROR_MESSAGES.REQUIRED_FIELD,
    pattern: {
      value: stringRegex,
      message: ERROR_MESSAGES.INVALID_NOMBRE_PROFESOR,
    },
  }
};