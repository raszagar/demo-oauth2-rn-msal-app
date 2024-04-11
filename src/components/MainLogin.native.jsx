
import { Oauth2Provider } from "../hooks/Oauth2Context";
import Main from "./Main";

const MainLogin = () => {
  return (
    <Oauth2Provider>
      <Main />
    </Oauth2Provider>
  );
}

export default MainLogin;
