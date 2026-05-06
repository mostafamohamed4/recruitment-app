import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CandidatesProvider } from "./context/CandidatesProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CandidatesProvider>
      <App />
    </CandidatesProvider>
  </StrictMode>,
);
