import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getOembed,
  getSimple,
} from "../../services/APIs/MusicAppAPI/MusicAppAPI.js";
import PropTypes from "prop-types";
import { getRandomNumberMinMax } from "../../utils/Utils.js";

const Container = styled.div``;

const SimpleScreen = ({ token }) => {
  const [hasError, setHasError] = useState(false);
  const [allContent, setAllContent] = useState(null);
  const [currentPlaylistHTML, setCurrentPlaylistHTML] = useState(null);
  const [fetchSuccess, setFetchSuccess] = useState(false);

  useEffect(() => {
    // Fetch all playlist info once
    if (token && !fetchSuccess) {
      const fetchData = async () => {
        const response = await getSimple(token);
        const data = response.data;
        setAllContent(data);
        setFetchSuccess(true);
      };
      try {
        fetchData();
      } catch {
        setHasError(true);
        setFetchSuccess(false);
      }
    }
  }, [token, allContent, fetchSuccess]);

  // Set/udpate the specific playlist info
  const setContent = async () => {
    const playlistInfo = allContent[getRandomNumberMinMax(0, 49)];
    const oembed = await getOembed(playlistInfo.src);
    setCurrentPlaylistHTML(oembed.html);
  };

  return (
    <Container>
      <h1>Simple Screen</h1>
      <h2 id="update-btn" onClick={() => setContent()}>
        Pull random playlist
      </h2>
      {currentPlaylistHTML && (
        <div
          className="Container"
          dangerouslySetInnerHTML={{ __html: currentPlaylistHTML }}
        ></div>
      )}
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
