import { useEffect, useState } from "react";
import styled from "styled-components";
import { getSimple } from "../../services/APIs/MusicAppAPI/MusicAppAPI.js";
import PropTypes from "prop-types";
import { getRandomNumberMinMax } from "../../utils/Utils.js";

const Container = styled.div``;

const SimpleScreen = ({ token }) => {
  const [hasError, setHasError] = useState(false);
  const [allContent, setAllContent] = useState(null);
  const [currentContent, setCurrentContent] = useState(null);
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const [fetchStarted, setFetchStarted] = useState(false);

  useEffect(() => {
    // Fetch all playlist info once
    if (token && !fetchStarted && !fetchSuccess) {
      const fetchData = async () => {
        const response = await getSimple(token);
        const data = response.data;
        setAllContent(data);
        setFetchSuccess(true);
      };
      try {
        setFetchStarted(true);
        fetchData();
      } catch {
        setHasError(true);
        setFetchSuccess(false);
        setFetchStarted(false);
      }
    }
  }, [token, allContent, fetchStarted, fetchSuccess]);

  // Set/udpate the specific playlist info
  const setContent = () => {
    const obj = allContent[getRandomNumberMinMax(0, 49)];
    setCurrentContent(obj.data);
  };

  return (
    <Container>
      <h1>Simple Screen</h1>
      <h2 id="update-btn" onClick={() => setContent()}>
        Pull random playlist
      </h2>
      {currentContent && <div>{currentContent}</div>}
      {hasError && <div>Error</div>}
    </Container>
  );
};

SimpleScreen.defaultProps = {
  token: null,
};

SimpleScreen.propTypes = {
  token: PropTypes.string,
};

export default SimpleScreen;
