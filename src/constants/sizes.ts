/* Standard font sizes */
/**
 * sm: labels and small text
 * md: placeholders, inputs, errors, notice
 * lg: default font size
 * xl: buttons
 * xxl: grow text
 * xxxl: titles
 */
export const fontSizes = {
  xxxs: '0.75rem',
  xxs: '0.875rem',
  xs: '0.95rem',
  xsm: '1.125rem',
  sm: '1.2rem',
  md: '1.4rem',
  lg: '1.6rem',
  xl: '1.8rem',
  xxl: '2rem',
  xxxl: '3rem',
} as const;

/* Margin and padding values (relative to root font size) */
export const spacing = {
  tiny: '0.1rem',
  micro: '0.25rem',
  small: '0.5rem',
  slim: '0.75rem',
  minimal: '1rem',
  compact: '1.25rem',
  narrow: '1.37rem',
  simple: '1.5rem',
  medium: '2rem',
  large: '2.25rem',
  larger: '3rem',
  xlarge: '4.125rem',
  xxl: '6rem',
  xxxl: '8rem',
} as const;
