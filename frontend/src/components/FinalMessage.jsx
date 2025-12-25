import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { finalMessage, heroData } from '../data/mock';

const FinalMessage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedParagraphs, setTypedParagraphs] = useState([]);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showSignature, setShowSignature] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Typewriter effect for paragraphs
  useEffect(() => {
    if (!isVisible) return;

    const paragraphs = finalMessage.paragraphs;
    
    if (currentParagraph < paragraphs.length) {
      const currentText = paragraphs[currentParagraph];
      
      if (currentChar < currentText.length) {
        const timeout = setTimeout(() => {
          setTypedParagraphs(prev => {
            const newParagraphs = [...prev];
            newParagraphs[currentParagraph] = currentText.substring(0, currentChar + 1);
            return newParagraphs;
          });
          setCurrentChar(prev => prev + 1);
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        // Move to next paragraph
        const timeout = setTimeout(() => {
          setCurrentParagraph(prev => prev + 1);
          setCurrentChar(0);
        }, 500);
        return () => clearTimeout(timeout);
      }
    } else {
      // Show signature after all paragraphs
      const timeout = setTimeout(() => setShowSignature(true), 300);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, currentParagraph, currentChar]);

  return (
    <section ref={sectionRef} className="final-message-section">
      <div className="message-container">
        {/* Decorative Elements */}
        <div className="decorative-hearts">
          {[...Array(12)].map((_, i) => (
            <Heart
              key={i}
              className="deco-heart"
              size={Math.random() * 16 + 12}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.3 + 0.1
              }}
              fill="rgba(244, 114, 182, 0.5)"
              stroke="none"
            />
          ))}
        </div>

        {/* Letter Container */}
        <div className={`letter-paper ${isVisible ? 'visible' : ''}`}>
          <div className="letter-header">
            <Sparkles className="letter-sparkle left" size={24} />
            <h2 className="letter-title">{finalMessage.title}</h2>
            <Sparkles className="letter-sparkle right" size={24} />
          </div>

          <div className="letter-body">
            {typedParagraphs.map((paragraph, index) => (
              <p key={index} className="letter-paragraph">
                {paragraph}
                {index === currentParagraph && currentChar < finalMessage.paragraphs[currentParagraph]?.length && (
                  <span className="typing-cursor">|</span>
                )}
              </p>
            ))}
          </div>

          <div className={`letter-signature ${showSignature ? 'visible' : ''}`}>
            <p className="signature-text">{finalMessage.signature}</p>
            <p className="signature-name">{finalMessage.signatureName}</p>
            <div className="signature-hearts">
              <Heart size={18} fill="#f472b6" stroke="none" />
              <Heart size={24} fill="#ec4899" stroke="none" />
              <Heart size={18} fill="#f472b6" stroke="none" />
            </div>
          </div>
        </div>

        {/* Final Birthday Wish */}
        <div className={`birthday-wish ${showSignature ? 'visible' : ''}`}>
          <p>Happy Birthday, {heroData.nickname}!</p>
          <p className="wish-year">May this year bring you endless joy & love</p>
        </div>
      </div>
    </section>
  );
};

export default FinalMessage;
