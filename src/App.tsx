import LandingPage from "./pages/LandingPage";
import { HashRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import {
  HOME_PAGE_URL,
  HOME_URL,
  LOGIN_URL,
  REGISTER_URL,
} from "./assets/ts/constants";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path={HOME_URL} element={<LandingPage />} />
          <Route path={LOGIN_URL} element={<LoginPage />} />
          <Route path={REGISTER_URL} element={<RegisterPage />} />
          <Route path={HOME_PAGE_URL} element={<HomePage />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
