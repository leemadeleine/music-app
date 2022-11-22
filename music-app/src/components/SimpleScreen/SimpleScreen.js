import { useEffect, useState } from "react";
import styled from "styled-components";
import { getSimple } from "../../services/MusicAppAPI/MusicAppAPI.js";
import { moods } from "./config.js";

const Container = styled.div``;

const SimpleScreen = () => {
  const [hasError, setHasError] = useState(false);
  const [currentMood, setCurrentMood] = useState(null);
  const [currentMoodData, setCurrentMoodData] = useState(null);
  useEffect(() => {
    if (currentMood) {
      try {
        async function fetchData() {
          const response = await getSimple(currentMood);
          setCurrentMoodData(response);
        }
        fetchData();
      } catch {
        setHasError(true);
      }
    }
  }, [currentMood]);

  return (
    <Container>
      <h1>Simple Screen</h1>
      {Object.keys(moods).map((moodName) => {
        const mood = moods[moodName];
        return (
          <div key={moodName} onClick={() => setCurrentMood(moodName)}>
            {mood.displayName}
          </div>
        );
      })}
      <div>{currentMoodData ? currentMoodData.mood : null}</div>
      {hasError && <div>Error</div>}
    </Container>
  );
};

export default SimpleScreen;
