import {
  ModalLoaderWrapper,
  SimpleLoaderWrapper,
  Spinner,
} from './Loader.styles';

interface LoaderProps {
  size?: string;
  thickness?: string;
  color?: string;
  isFullScreen?: boolean;
}

export default function Loader(props: LoaderProps) {
  const { isFullScreen, size, thickness, color } = props;

  return isFullScreen ? (
    <ModalLoaderWrapper data-testid="modal-loader-wrapper">
      <Spinner
        data-testid="spinner"
        $size={size}
        $thickness={thickness}
        color={color}
      />
    </ModalLoaderWrapper>
  ) : (
    <SimpleLoaderWrapper data-testid="simple-loader-wrapper">
      <Spinner
        data-testid="spinner"
        $size={size}
        $thickness={thickness}
        color={color}
      />
    </SimpleLoaderWrapper>
  );
}
