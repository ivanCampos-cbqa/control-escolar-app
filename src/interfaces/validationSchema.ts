import { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';

export type ValidationSchema<Form extends FieldValues> = Partial<{
  [K in FieldPath<Form>]: RegisterOptions<Form, K>;
}>;
