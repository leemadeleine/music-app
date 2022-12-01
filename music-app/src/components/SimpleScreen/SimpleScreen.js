import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getOembed,
  getRecommendations,
  getSimple,
} from "../../services/APIs/MusicAppAPI/MusicAppAPI.js";
import PropTypes from "prop-types";

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
  const setContent = async (mood) => {
    const recs = await getRecommendations(token, mood);
    const oembed = await getOembed(
      recs.data.tracks[0].album.external_urls.spotify
    );
    setCurrentPlaylistHTML(oembed.html);
  };

  const moods = ["happy", "sad", "angry", "in-love"];

  return (
    <Container>
      <h1>Simple Screen</h1>
      <div>
        {moods.map((mood) => (
          <h2 key={mood} id="update-btn" onClick={() => setContent(mood)}>
            {mood}
          </h2>
        ))}
      </div>
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
