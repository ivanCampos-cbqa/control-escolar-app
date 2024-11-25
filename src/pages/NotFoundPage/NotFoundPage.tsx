import { useNavigate } from "react-router-dom";

import {
  ImageSection,
  PageWrapper,
  TextErrorTitle,
  TextSection,
  TextErrorMessage,
  NotFoundImageStyled,
} from "./NotFoundPage.styles";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <PageWrapper>
      <ImageSection>
        <NotFoundImageStyled />
      </ImageSection>
      <TextSection>
        <TextErrorTitle>Error 404</TextErrorTitle>
        <TextErrorMessage>Page not found</TextErrorMessage>
      </TextSection>
      <button onClick={handleGoBack}> Return to last page</button>
    </PageWrapper>
  );
};

export default NotFoundPage;
