
/* Colors */
export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  grayText: '#64676C',
  gray: '#EFEFEF', // disable state
  lighterGray: '#F7FAFF',
  lightGray: '#D4D4D4',
  midLightGray: '#939EAE',
  midGray: '#50555C',
  midDarkGray: '#3C3C43',
  darkGray: '#1E1E1E',
  blue: '#007AFF',
  lightBlue: '#5596DF',
  darkMiddleBlue: '#053192',
  darkBlue: '#001538',
  green: '#1E8E3E',
  orange: '#F2AE00',
  red: '#EA4335',
  lightRed: '#F15723',
  lighterBlue: '#f6f8fc',
  offWhite: '#F7F7F7',
};

/* Color Transparencies */
export const shades = {
  lightBlue_12: `${colors.lightBlue}22`,
  darkBlue_25: `${colors.darkBlue}44`,
  lightGray_25: `${colors.lightGray}44`,
  lightGray_12: `${colors.lightGray}22`,
  darkGray_25: `${colors.darkGray}44`,
} as const;
