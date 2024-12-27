import React from 'react';

export default function GradientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      {/* Dark base layer */}
      <div className="absolute inset-0 bg-background-primary" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />
      
      {/* Radial gradients for depth */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-purple-900/10 to-transparent" />
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-gradient-radial from-blue-900/10 to-transparent" />
    </div>
  );
}
