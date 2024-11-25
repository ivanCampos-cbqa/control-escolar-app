import { useNavigate, useRouteError } from 'react-router-dom';

import {
  CodeTextError,
  PageWrapper,
  TextSection,
  TextErrorTitle,
  // ErrorBoundaryImageStyled,
} from './ErrorBoundaryPage.styles';

const ErrorBoundaryPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <PageWrapper>
      {/* <ErrorBoundaryImageStyled /> */}
      <TextSection>
        <TextErrorTitle>Something went wrong</TextErrorTitle>
        {error instanceof Error && (
          <CodeTextError>{error.message}</CodeTextError>
        )}
      </TextSection>
      <button title="Return to last page" onClick={handleGoBack} />
    </PageWrapper>
  );
};

export default ErrorBoundaryPage;
