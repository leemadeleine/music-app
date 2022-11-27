import { useState } from "react";
import SimpleScreen from "./components/SimpleScreen/SimpleScreen";
import Auth from "./components/Auth/Auth";

function App() {
  const [authData, setAuthData] = useState(null);
  return (
    <div>
      {!authData ? (
        <Auth authData={authData} setAuthData={setAuthData} />
      ) : (
        <SimpleScreen token={authData?.token} />
      )}
    </div>
  );
}

export default App;
