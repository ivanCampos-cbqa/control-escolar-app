export const stringRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/;

// Validate strings that do not start or end with whitespace
export const emptySpacesRegex = /^(?!\s)(.*\S.*|)\S(?!\s)$/;

export const getUserFullName = (
  userName: string,
  userLastname?: string,
): string => {
  if (!userName || !userLastname) return 'Unknown';
  return `${userName}\u00A0${userLastname}`;
};

export const matriculaRegex = /^[a-zA-Z0-9]{5,10}$/;

export const isBlankString = (value: string): boolean => value.trim() === '';
