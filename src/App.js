import { useState } from "react";
import styled from 'styled-components';
import SimpleScreen from "./components/SimpleScreen/SimpleScreen";
import Auth from "./components/Auth";


const AppContainer = styled.div`
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  text-align: center;
  padding: 64px 0;

  background: radial-gradient(#b74a84, #1c1364);
  color: white;
  font-family: Poppins;

  h1 {
    font-weight: 200;
  }
  h2 {
    font-weight: 200;
  }
`;

function App() {
  const [authData, setAuthData] = useState(null);
  return (
    <AppContainer>
      {!authData ? (
        <Auth authData={authData} setAuthData={setAuthData} />
      ) : (
        <SimpleScreen token={authData?.token} />
      )}
    </AppContainer>
  );
}

export default App;
