
import React, { useState, useCallback, useEffect } from 'react';
import Wheel from './components/Wheel';
import MenuInput from './components/MenuInput';
import bubu from './bubu.png';
const SPINNER_COLORS = [
  '#fde047', '#f97316', '#ef4444', '#ec4899',
  '#d946ef', '#a855f7', '#8b5cf6', '#6366f1',
  '#3b82f6', '#0ea5e9', '#06b6d4', '#14b8a6',
  '#22c55e', '#84cc16'
];

const MENU_ITEMS_STORAGE_KEY = 'spinTheWheelMenuItems';

const App: React.FC = () => {
  const [menuItems, setMenuItems] = useState<string[]>(() => {
    try {
      const savedItems = window.localStorage.getItem(MENU_ITEMS_STORAGE_KEY);
      return savedItems ? JSON.parse(savedItems) : [];
    } catch (error) {
      console.error("Could not load menu items from local storage", error);
      return [];
    }
  });
  
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  
  useEffect(() => {
    try {
      window.localStorage.setItem(MENU_ITEMS_STORAGE_KEY, JSON.stringify(menuItems));
    } catch (error) {
      console.error("Could not save menu items to local storage", error);
    }
  }, [menuItems]);

  const handleAddItem = useCallback((item: string) => {
    if (item.trim() !== '') {
      setMenuItems(prev => [...prev, item.trim()]);
    }
  }, []);

  const handleRemoveItem = useCallback((indexToRemove: number) => {
    setMenuItems(prev => prev.filter((_, index) => index !== indexToRemove));
  }, []);
  
  const handleSpin = () => {
    if (isSpinning || menuItems.length < 2) return;

    // Reset rotation visually to 0 before starting a new spin
    setIsSpinning(true);
    setWinner(null);

    // Step 1: Reset rotation to 0 with no transition
    if(rotation != 0){
      setRotation(0);
    }

    // Step 2: Wait for the reset to apply (next tick), then do the spin
    setTimeout(() => {
      const totalItems = menuItems.length;
      const degreesPerItem = 360 / totalItems;

      const winnerIndex = Math.floor(Math.random() * totalItems);
      const randomOffset = Math.random() * degreesPerItem * 0.8 - (degreesPerItem * 0.4); // +/- 40% of slice
      const targetAngle = 270 - (winnerIndex * degreesPerItem + degreesPerItem / 2) + randomOffset;
      const randomSpins = 8 + Math.floor(Math.random() * 5); // 8 to 12 spins
      const newRotation = (randomSpins * 360) + targetAngle; 

      // Now apply rotation with spin transition
      setRotation(newRotation);

      const spinDuration = 6000;
      setTimeout(() => {
        setIsSpinning(false);
        setWinner(menuItems[winnerIndex]);
      }, spinDuration);
    }, 1000); // Small delay to allow reset to render
  };


  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <header className="text-center mb-[100px]">
        <h1 className="text-5xl font-bold text-yellow-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">Dudu's Decision Wheel</h1>
        <p className="text-slate-400 mt-2">Add your choices and spin the wheel!</p>
      </header>

      <main className="w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8">
        <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] mb-6">
              <img src={bubu} className="w-[77px] h-[77px] absolute top-[-45px] left-1/2 -translate-x-1/2 z-20" alt="bubu"/>
              {/* <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 z-10" style={{ filter: 'drop-shadow(0 4px 3px rgba(0,0,0,0.5))' }}>
                 <svg width="50" height="60" viewBox="0 0 50 60">
                    <polygon points="25,60 0,0 50,0" className="fill-red-500" />
                 </svg>
              </div> */}
              <Wheel items={menuItems} rotation={rotation} colors={SPINNER_COLORS} />
            </div>

            <button
              onClick={handleSpin}
              disabled={isSpinning || menuItems.length < 2}
              className="px-12 py-4 text-2xl font-bold bg-green-500 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
            >
              {isSpinning ? 'Spinning...' : 'SPIN!'}
            </button>

            {winner && !isSpinning && (
              <div className="mt-6 text-center p-4 bg-slate-800 rounded-lg shadow-xl">
                <p className="text-lg text-slate-300">The winner is...</p>
                <p className="text-4xl font-extrabold text-yellow-400 animate-pulse">{winner}</p>
              </div>
            )}
        </div>

        <div className="w-full lg:w-1/2 max-w-md mt-8 lg:mt-0">
          <MenuInput
            items={menuItems}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            disabled={isSpinning}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
