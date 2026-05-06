import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import './App.css'
import CandidateProfile from "./pages/CandidateProfile";
import Header from "./components/Header";

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/candidate/:id" element={<CandidateProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
