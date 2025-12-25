import React, { useEffect, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { heroData } from '../data/mock';

const HeroSection = () => {
  const [showContent, setShowContent] = useState(false);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Generate floating hearts for the constellation effect
    const generatedHearts = [];
    for (let i = 0; i < 50; i++) {
      generatedHearts.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 4,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
    setHearts(generatedHearts);

    // Show main content after initial animation
    const timer = setTimeout(() => setShowContent(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero-section">
      {/* Animated Background Hearts Constellation */}
      <div className="hearts-constellation">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="floating-heart"
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
            }}
          >
            <Heart
              size={heart.size}
              fill="rgba(244, 114, 182, 0.6)"
              stroke="rgba(251, 207, 232, 0.8)"
              style={{ opacity: heart.opacity }}
            />
          </div>
        ))}
      </div>

      {/* Central Blooming Heart Animation */}
      <div className="central-heart-container">
        <div className="heart-bloom">
          <div className="heart-layer heart-layer-1">
            <Heart size={120} fill="url(#heartGradient)" stroke="none" />
          </div>
          <div className="heart-layer heart-layer-2">
            <Heart size={160} fill="none" stroke="rgba(244, 114, 182, 0.4)" strokeWidth={1} />
          </div>
          <div className="heart-layer heart-layer-3">
            <Heart size={200} fill="none" stroke="rgba(251, 191, 36, 0.3)" strokeWidth={1} />
          </div>
          <div className="heart-glow"></div>
        </div>
        
        {/* Sparkle Effects */}
        <div className="sparkles-container">
          {[...Array(8)].map((_, i) => (
            <Sparkles
              key={i}
              className="sparkle"
              size={16}
              style={{
                animationDelay: `${i * 0.3}s`,
                transform: `rotate(${i * 45}deg) translateY(-100px)`
              }}
            />
          ))}
        </div>
      </div>

      {/* SVG Gradient Definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#db2777" />
          </linearGradient>
        </defs>
      </svg>

      {/* Hero Content */}
      <div className={`hero-content ${showContent ? 'visible' : ''}`}>
        <p className="hero-subtitle">A Special Day for</p>
        <h1 className="hero-title">
          <span className="name-highlight">{heroData.name}</span>
        </h1>
        <p className="hero-nickname">My dearest {heroData.nickname}</p>
        <div className="hero-message">
          <TypewriterText text={heroData.mainMessage} delay={100} />
        </div>
        <p className="hero-submessage">{heroData.subMessage}</p>
        
        <a href="#memories" className="scroll-indicator">
          <span>Explore Our Memories</span>
          <div className="scroll-arrow">
            <Heart size={20} />
          </div>
        </a>
      </div>
    </section>
  );
};

// Typewriter Effect Component
const TypewriterText = ({ text, delay = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      // Blinking cursor after typing completes
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      return () => clearInterval(cursorInterval);
    }
  }, [currentIndex, text, delay]);

  return (
    <span className="typewriter">
      {displayText}
      <span className={`cursor ${showCursor ? 'visible' : ''}`}>|</span>
    </span>
  );
};

export default HeroSection;
