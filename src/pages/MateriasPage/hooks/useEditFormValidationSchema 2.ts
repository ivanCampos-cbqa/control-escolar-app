import { ERROR_MESSAGES } from "@constants";
import { ValidationSchema, MateriaEditFormFields } from "@interfaces";
import { stringRegex } from "@utils";

export const materiaEditFormValidationSchema: ValidationSchema<MateriaEditFormFields> = {
  nombre: {
    required: ERROR_MESSAGES.REQUIRED_FIELD,
  },
  codigoMateria: {
    required: ERROR_MESSAGES.REQUIRED_FIELD,
  },
  nombreProfesor: {
    required: ERROR_MESSAGES.REQUIRED_FIELD,
    pattern: {
      value: stringRegex,
      message: ERROR_MESSAGES.INVALID_NOMBRE_PROFESOR,
    },
  },
};