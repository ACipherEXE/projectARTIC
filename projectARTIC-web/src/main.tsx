import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import NavBar from "./components/custom/NavBar.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EntryList from "./Pages/EntryList.tsx";
import LookUp from "./Pages/LookUp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <NavBar>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/entry-list" element={<EntryList />} />
          <Route path="/look-up" element={<LookUp />} />
          <Route path="/look-up/:studentId" element={<LookUp />} />
        </Routes>
      </NavBar>
    </BrowserRouter>
  </StrictMode>,
);
