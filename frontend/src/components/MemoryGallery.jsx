import React, { useState } from 'react';
import { Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { memories } from '../data/mock';

const MemoryGallery = () => {
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (memory, index) => {
    setSelectedMemory(memory);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedMemory(null);
  };

  const navigateMemory = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % memories.length 
      : (currentIndex - 1 + memories.length) % memories.length;
    setCurrentIndex(newIndex);
    setSelectedMemory(memories[newIndex]);
  };

  return (
    <section id="memories" className="memory-gallery-section">
      <div className="section-header">
        <Heart className="section-icon" size={32} />
        <h2 className="section-title">Our Beautiful Memories</h2>
        <p className="section-subtitle">Each moment with you is a treasure I hold close to my heart</p>
      </div>

      <div className="memory-grid">
        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            className="memory-card"
            onClick={() => openLightbox(memory, index)}
            initial={{ 
              opacity: 0, 
              rotateY: -15, 
              y: 50 
            }}
            whileInView={{ 
              opacity: 1, 
              rotateY: 0, 
              y: 0 
            }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.1,
              ease: "easeOut" 
            }}
          >
            <div className="polaroid-frame">
              <div className="photo-container">
                <img src={memory.image} alt={memory.title} loading="lazy" />
                <div className="photo-overlay">
                  <Heart className="overlay-heart" size={32} />
                  <span>Click to read</span>
                </div>
              </div>
              <div className="polaroid-caption">
                <p className="memory-title">{memory.title}</p>
                <p className="memory-date">{memory.date}</p>
              </div>
            </div>
            <div className="card-tape tape-left"></div>
            <div className="card-tape tape-right"></div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedMemory && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              <X size={24} />
            </button>
            
            <button 
              className="lightbox-nav lightbox-prev" 
              onClick={() => navigateMemory('prev')}
            >
              <ChevronLeft size={28} />
            </button>
            
            <div className="lightbox-main">
              <div className="lightbox-image-container">
                <img src={selectedMemory.image} alt={selectedMemory.title} />
              </div>
              <div className="lightbox-details">
                <div className="lightbox-header">
                  <Heart size={32} fill="#ec4899" stroke="none" className="lightbox-heart-icon" />
                  <h3 className="lightbox-title">{selectedMemory.title}</h3>
                </div>
                <div className="lightbox-message">
                  <TypewriterMessage text={selectedMemory.message} />
                </div>
                <div className="lightbox-quote">
                  <p className="quote-text">"{selectedMemory.quote || 'Every moment with you is a treasure I hold close to my heart.'}"</p>
                  <p className="quote-author">- Siddhesh 💕</p>
                </div>
              </div>
            </div>
            
            <button 
              className="lightbox-nav lightbox-next" 
              onClick={() => navigateMemory('next')}
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

// Typewriter for lightbox messages
const TypewriterMessage = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  React.useEffect(() => {
    setDisplayText('');
    setIsComplete(false);
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.substring(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <p className={`typewriter-message ${isComplete ? 'complete' : ''}`}>
      {displayText}
      {!isComplete && <span className="typing-cursor">|</span>}
    </p>
  );
};

export default MemoryGallery;
