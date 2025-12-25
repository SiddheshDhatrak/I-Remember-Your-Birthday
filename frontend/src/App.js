import React from "react";
// CHANGED: Import HashRouter instead of BrowserRouter
import { HashRouter, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import MemoryGallery from "./components/MemoryGallery";
import FinalMessage from "./components/FinalMessage";
import { HeartCursor } from "./components/HeartCursor";
import "./styles/birthday.css";

// Background Audio Component
const BackgroundAudio = () => {
  React.useEffect(() => {
    // Keep this PUBLIC_URL part, it is correct!
    const audio = new Audio(process.env.PUBLIC_URL + '/aud.mp3');
    audio.volume = 0.7;
    audio.loop = false;

    const attemptAutoplay = async () => {
      try {
        await audio.play();
        console.log('Audio started playing automatically!');
        audio.addEventListener('ended', () => {
          console.log('Audio finished playing');
        });
      } catch (error) {
        console.log('Autoplay blocked by browser (this is normal)');
        const playOnFirstClick = async () => {
          try {
            await audio.play();
            document.removeEventListener('click', playOnFirstClick);
            document.removeEventListener('touchstart', playOnFirstClick);
          } catch (e) {
            console.log('Click play failed');
          }
        };
        document.addEventListener('click', playOnFirstClick);
        document.addEventListener('touchstart', playOnFirstClick);
      }
    };
    setTimeout(attemptAutoplay, 500);
    return () => { audio.pause(); };
  }, []);

  return null;
};

const BirthdayPage = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="birthday-container">
      <BackgroundAudio />
      <HeartCursor />
      <HeroSection />
      <MemoryGallery />
      <FinalMessage />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      {/* CHANGED: Switched to HashRouter. No basename needed! */}
      <HashRouter>
        <Routes>
          <Route path="/" element={<BirthdayPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;