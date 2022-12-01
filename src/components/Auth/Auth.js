import PropTypes from "prop-types";
import { useEffect } from "react";
import {
  getClientCredentials,
  getToken,
} from "../../services/APIs/AuthAPI/AuthAPI";
import { getRandomNumberLength } from "../../utils/Utils";

const getAuthorizationCode = async (id) => {
  const baseURL = new URL("https://accounts.spotify.com/authorize");
  const params = {
    client_id: id,
    response_type: "code",
    redirect_uri: "http://localhost:3000",
    state: getRandomNumberLength(), // TODO: add state check
  };
  Object.keys(params).forEach((param) => {
    baseURL.searchParams.append(param, params[param]);
  });
  window.location.href = baseURL;
};

const Auth = ({ setAuthData, authData }) => {
  const urlParams = new URL(window.location);
  const authCode = urlParams.searchParams.get("code");
  useEffect(() => {
    if (authCode && !authData) {
      const fetchData = async () => {
        const response = await getToken(authCode);
        setAuthData({ token: response.access_token });
      };
      fetchData();
    }
  }, [authCode, setAuthData, authData]);

  const handleLogin = () => {
    try {
      async function fetchData() {
        // is this an anti pattern?
        const creds = await getClientCredentials();
        getAuthorizationCode(creds.client_id);
      }
      fetchData();
    } catch {
      console.error("failed");
    }
  };
  return <div onClick={() => handleLogin()}>Login</div>;
};

Auth.defaultProps = {
  setAuthData: () => {},
  authData: {},
};

Auth.propTypes = {
  setAuthData: PropTypes.func,
  authData: PropTypes.object,
};

export default Auth;
