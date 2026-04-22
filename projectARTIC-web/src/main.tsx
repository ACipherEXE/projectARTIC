import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import NavBar from "./components/custom/NavBar.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EntryList from "./Apps/EntryList.tsx";
import LookUp from "./Apps/LookUp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <NavBar>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/entry-list" element={<EntryList />} />
          <Route path="/look-up" element={<LookUp />} />
        </Routes>
      </NavBar>
    </BrowserRouter>
  </StrictMode>,
);
