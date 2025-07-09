
import React from 'react';

interface WheelProps {
  items: string[];
  rotation: number;
  colors: string[];
}

const Wheel: React.FC<WheelProps> = ({ items, rotation, colors }) => {
  const numItems = items.length;

  if (numItems === 0) {
    return (
      <div
        className="relative w-full h-full rounded-full border-8 border-slate-700 shadow-2xl bg-slate-800 flex items-center justify-center text-center p-4"
      >
        <p className="text-slate-400">Add food options to build the wheel!</p>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 md:w-20 md:h-20 bg-slate-800 rounded-full -translate-x-1/2 -translate-y-1/2 border-4 border-slate-600 shadow-inner"></div>
      </div>
    );
  }

  const degreesPerItem = 360 / numItems;

  // Function to truncate text gracefully
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div
      className="relative w-full h-full rounded-full border-8 border-slate-700 shadow-2xl"
      style={{
        transition: 'transform 6s cubic-bezier(0.25, 0.1, 0.25, 1)',
        transform: `rotate(${rotation}deg)`,
        background: `conic-gradient(${items
          .map((_, i) => `${colors[i % colors.length]} ${i * degreesPerItem}deg ${(i + 1) * degreesPerItem}deg`)
          .join(', ')})`
      }}
    >
      <div className="absolute w-full h-full">
        {items.map((item, index) => {
          const angle = index * degreesPerItem;
          const textAngle = angle + degreesPerItem / 2;
          const textLength = item.length;
          const maxLength = numItems > 10 ? 10 : 15;

          return (
            <div
              key={index}
              className="absolute w-full h-full"
              style={{ transform: `rotate(${textAngle}deg)` }}
            >
              <span
                className="absolute left-[55%] top-1/2 -translate-y-1/2 text-black font-bold text-sm md:text-base"
                style={{
                  transform: 'rotate(-90deg)', // Keep text horizontal relative to user
                  whiteSpace: 'nowrap',
                  textShadow: '0 0 2px white, 0 0 2px white', // Make text more readable
                  maxWidth: '40%'
                }}
              >
                {truncateText(item, maxLength)}
              </span>
            </div>
          );
        })}
      </div>
       {/* Center circle */}
      <div className="absolute top-1/2 left-1/2 w-16 h-16 md:w-20 md:h-20 bg-slate-800 rounded-full -translate-x-1/2 -translate-y-1/2 border-4 border-slate-600 shadow-inner"></div>
    </div>
  );
};

export default Wheel;
