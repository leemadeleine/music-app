import { useState } from "react";
import styled from "styled-components";
import { getRecommendations } from "../../services/APIs/MusicAppAPI.js";
import PropTypes from "prop-types";
import { moods } from "./moodConfig.js";
import shuffleIcon from "./assets/shuffle.png";

const SimpleScreenContainer = styled.div`
  max-width: 600px;
  margin: auto;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 72px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 64px;
`;

const MoodOption = styled.div`
  cursor: pointer;
`;

const StyledH2 = styled.h2`
  margin-bottom: 8px;
`;

const ShuffleIcon = styled.img`
  width: 24px;
  filter: invert(1);
`;

const Placeholder = styled.div`
  font-style: italic;
  margin-top: 110px;

  animation: bounce 3s infinite;

  @keyframes bounce {
    0% {
      margin-top: 110px;
    }
    50% {
      margin-top: 100px;
    }
    100% {
      margin-top: 110px;
    }
  }
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
            <MoodOption onClick={() => setContent(mood.tag)}>
              <StyledH2 key={mood.tag} id="update-btn">
                {mood.label}
              </StyledH2>
              <ShuffleIcon src={shuffleIcon} />
            </MoodOption>
          );
        })}
      </ButtonContainer>
      {currentInfo ? (
        <iframe
          style={{
            border: "none",
            "border-radius": "12px",
          }}
          title={currentInfo.title}
          width="100%"
          height="300"
          allowfullscreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          src={`${currentInfo.src}?utm_source=oembed`}
        ></iframe>
      ) : (
        <Placeholder>
          Pick a mood, shuffle as many times as you'd like
        </Placeholder>
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
