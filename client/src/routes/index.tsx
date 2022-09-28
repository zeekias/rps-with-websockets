import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../pages/main";
import { GlobalStyle } from "../styles/GlobalStyles";
import { GameContextProvider } from "../context/gameContext";

export const RoutesApp: React.FC = () => {
  return (
    <BrowserRouter>
      <GameContextProvider>
        <GlobalStyle />
        <Routes>
          <Route element={<Main />} path="/" />
          <Route element={<Main />} path="/play/:id" />
        </Routes>
      </GameContextProvider>
    </BrowserRouter>
  );
};
