import { render, screen } from '@testing-library/react';

import { colors } from '@constants';

import Loader from './Loader';

describe('Loader component', () => {
  test('should render the Loader component with default props', () => {
    render(<Loader />);
    const spinner = screen.getByTestId('spinner');

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveStyle({
      width: '8rem',
      height: '8rem',
      borderTop: `0.5rem solid ${colors.blue}`,
    });
  });

  test('should render with custom size, thickness, and color', () => {
    render(<Loader size="10rem" thickness="0.8rem" color="red" />);

    const spinner = screen.getByTestId('spinner');

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveStyle({
      width: '10rem',
      height: '10rem',
      borderTop: '0.8rem solid red',
    });
  });

  test('should apply custom size when passed as prop', () => {
    render(<Loader size="12rem" />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toHaveStyle({ width: '12rem', height: '12rem' });
  });

  test('should apply custom thickness when passed as prop', () => {
    render(<Loader thickness="0.8rem" />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toHaveStyle({ borderWidth: '0.8rem' });
  });

  test('should apply custom color when passed as prop', () => {
    render(<Loader color="green" />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toHaveStyle({ borderTop: '0.5rem solid green' });
  });

  test('should render the simple loader when isFullScreen is false', () => {
    render(<Loader isFullScreen={false} />);

    const simpleWrapper = screen.getByTestId('simple-loader-wrapper');
    const modalWrapper = screen.queryByTestId('modal-loader-wrapper');

    expect(simpleWrapper).toBeInTheDocument();
    expect(modalWrapper).not.toBeInTheDocument();
  });

  test('should render the modal loader when isFullScreen is true', () => {
    render(<Loader isFullScreen={true} />);

    const modalWrapper = screen.getByTestId('modal-loader-wrapper');
    const simpleWrapper = screen.queryByTestId('simple-loader-wrapper');

    expect(modalWrapper).toBeInTheDocument();
    expect(simpleWrapper).not.toBeInTheDocument();
  });
});
