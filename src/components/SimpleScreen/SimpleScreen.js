import { useState } from "react";
import styled from "styled-components";
import {
  getRecommendations,
} from "../../services/APIs/MusicAppAPI/MusicAppAPI.js";
import PropTypes from "prop-types";
import { moods } from "./moodConfig.js";

const Container = styled.div`
  max-width: 600px;
  text-align: center;
  margin: auto;
  padding: 32px 0;
  font-family: Poppins;
  background: none;
  color: white;
  
  h1 {
    font-weight: 100;
  }
  h2 {
    font-weight: 200;
  }
`;

const Title = styled.h1`
  margin-top: 0;
  font-size: 72px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 48px;
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
    <Container>
      <Title>mood</Title>
      <ButtonContainer>
        {Object.keys(moods).map((key) => {
          const mood = moods[key];
          return (
            <h2 key={mood.tag} id="update-btn" onClick={() => setContent(mood.tag)}>
              {mood.label}
            </h2>
          )
        })}
      </ButtonContainer>
      {currentInfo && (
        <iframe style={{"border": "none"}} title={currentInfo.title} width="300" height="300" src={currentInfo.src}></iframe>
      )}
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
