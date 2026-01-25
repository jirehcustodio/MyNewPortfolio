"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Shape {
  id: number;
  type: 'code' | 'bracket' | 'semicolon' | 'cube' | 'triangle' | 'circle' | 'slash' | 'tag';
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

export default function FloatingShapes() {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    const generateShapes = (): Shape[] => {
      const shapeTypes: Shape['type'][] = ['code', 'bracket', 'semicolon', 'cube', 'triangle', 'circle', 'slash', 'tag'];
      const count = 25; // Number of floating shapes
      
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 20 + Math.random() * 40, // Size between 20-60px
        duration: 20 + Math.random() * 30, // Duration between 20-50s
        delay: Math.random() * 5,
        rotation: Math.random() * 360,
      }));
    };

    setShapes(generateShapes());
  }, []);

  const renderShape = (shape: Shape) => {
    const baseClasses = "absolute opacity-[0.15] pointer-events-none";
    
    switch (shape.type) {
      case 'code':
        return (
          <svg width={shape.size} height={shape.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={baseClasses}>
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        );
      
      case 'bracket':
        return (
          <svg width={shape.size} height={shape.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={baseClasses}>
            <path d="M16 3h3v18h-3M8 3H5v18h3" />
          </svg>
        );
      
      case 'semicolon':
        return (
          <svg width={shape.size} height={shape.size} viewBox="0 0 24 24" fill="none" className={baseClasses}>
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="22" fill="currentColor" fontFamily="monospace" fontWeight="bold">;</text>
          </svg>
        );
      
      case 'cube':
        return (
          <svg width={shape.size} height={shape.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={baseClasses}>
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        );
      
      case 'triangle':
        return (
          <svg width={shape.size} height={shape.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={baseClasses}>
            <polygon points="12 2 2 22 22 22" />
          </svg>
        );
      
      case 'circle':
        return (
          <svg width={shape.size} height={shape.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={baseClasses}>
            <circle cx="12" cy="12" r="10" />
          </svg>
        );
      
      case 'slash':
        return (
          <svg width={shape.size} height={shape.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={baseClasses}>
            <line x1="4" y1="20" x2="20" y2="4" />
          </svg>
        );
      
      case 'tag':
        return (
          <svg width={shape.size} height={shape.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={baseClasses}>
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute text-neutral-900"
          initial={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            rotate: shape.rotation,
          }}
          animate={{
            top: [`${shape.y}%`, `${shape.y - 20}%`, `${shape.y}%`],
            rotate: [shape.rotation, shape.rotation + 180, shape.rotation + 360],
            left: [`${shape.x}%`, `${shape.x + 5}%`, `${shape.x}%`],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {renderShape(shape)}
        </motion.div>
      ))}
    </div>
  );
}
