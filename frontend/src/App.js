import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import MemoryGallery from "./components/MemoryGallery";
import FinalMessage from "./components/FinalMessage";
import { HeartCursor } from "./components/HeartCursor";
import "./styles/birthday.css";

// Background Audio Component
const BackgroundAudio = () => {
  React.useEffect(() => {
    const audio = new Audio('/aud.mp3');
    audio.volume = 0.7;
    audio.loop = false;

    // Attempt autoplay immediately
    const attemptAutoplay = async () => {
      try {
        await audio.play();
        console.log('Audio started playing automatically!');

        audio.addEventListener('ended', () => {
          console.log('Audio finished playing');
        });
      } catch (error) {
        console.log('Autoplay blocked by browser (this is normal)');

        // As a last resort, try to play on first click anywhere
        const playOnFirstClick = async () => {
          try {
            await audio.play();
            console.log('Audio started on first user interaction');
            document.removeEventListener('click', playOnFirstClick);
            document.removeEventListener('touchstart', playOnFirstClick);
          } catch (e) {
            console.log('Even click-based play failed');
          }
        };

        document.addEventListener('click', playOnFirstClick);
        document.addEventListener('touchstart', playOnFirstClick);
      }
    };

    // Small delay then attempt
    setTimeout(attemptAutoplay, 500);

    return () => {
      audio.pause();
    };
  }, []);

  return null;
};

const BirthdayPage = () => {
  React.useEffect(() => {
    // Scroll to top on component mount
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BirthdayPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
