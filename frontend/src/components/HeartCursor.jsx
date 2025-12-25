import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const HeartCursor = () => {
  const [hearts, setHearts] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heartIdRef = React.useRef(0);

  useEffect(() => {
    let lastTime = Date.now();
    const throttleDelay = 100; // Create heart every 100ms

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const now = Date.now();
      if (now - lastTime > throttleDelay) {
        lastTime = now;
        const newHeart = {
          id: heartIdRef.current++,
          x: e.clientX,
          y: e.clientY,
        };
        setHearts(prev => [...prev, newHeart]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Clean up old hearts
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => prev.slice(-15)); // Keep only last 15 hearts
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-2xl"
            initial={{ 
              x: heart.x - 12, 
              y: heart.y - 12,
              opacity: 0.8,
              scale: 0,
            }}
            animate={{ 
              y: heart.y - 60,
              opacity: 0,
              scale: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.5,
              ease: 'easeOut',
            }}
          >
            💕
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};