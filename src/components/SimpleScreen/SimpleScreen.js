import { useState } from "react";
import styled from "styled-components";
import { getRecommendations } from "../../services/APIs/MusicAppAPI.js";
import PropTypes from "prop-types";
import { moods } from "./moodConfig.js";

const SimpleScreenContainer = styled.div`
  max-width: 600px;
  margin: auto;
`;

const Title = styled.h1`
  margin-top: 0;
  font-size: 72px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const SimpleScreen = ({ token }) => {
  const [currentInfo, setCurrentInfo] = useState(null);

  // Set/udpate the specific playlist info
  const setContent = async (mood) => {
    const recs = await getRecommendations(token, mood);
    setCurrentInfo({
      src: recs.data.tracks[0].album.external_urls.spotify.replace(
        "/album/",
        "/embed/album/"
      ),
      title: recs.data.tracks[0].album.name,
    });
  };

  return (
    <SimpleScreenContainer>
      <Title>mood</Title>
      <ButtonContainer>
        {Object.keys(moods).map((key) => {
          const mood = moods[key];
          return (
            <h2
              key={mood.tag}
              id="update-btn"
              onClick={() => setContent(mood.tag)}
            >
              {mood.label}
            </h2>
          );
        })}
      </ButtonContainer>
      {currentInfo && (
        <iframe
          style={{ border: "none", "border-radius": "12px", background: "lightgray" }}
          title={currentInfo.title}
          width="100%"
          height="300"
          allowfullscreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          src={`${currentInfo.src}?utm_source=oembed`}
        ></iframe>
      )}
    </SimpleScreenContainer>
  );
};

SimpleScreen.defaultProps = {
  token: null,
};

SimpleScreen.propTypes = {
  token: PropTypes.string,
};

export default SimpleScreen;
