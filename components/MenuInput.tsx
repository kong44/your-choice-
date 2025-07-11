
import React, { useState } from 'react';
import Btn_Add from '../add_btn.mp3';
interface MenuInputProps {
  items: string[];
  onAddItem: (item: string) => void;
  onRemoveItem: (index: number) => void;
  disabled: boolean;
}

const TrashIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.58.22-2.365.468a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.576l.84-10.518.149.022a.75.75 0 10.23-1.482A41.13 41.13 0 0014 4.193v-.443A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75a1.25 1.25 0 00-1.25-1.25h-2.5A1.25 1.25 0 007.5 3.75v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
    </svg>
);


const MenuInput: React.FC<MenuInputProps> = ({ items, onAddItem, onRemoveItem, disabled }) => {
  const [newItem, setNewItem] = useState('');
  const soundAdd = new Audio(Btn_Add);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddItem(newItem);
    setNewItem('');
    soundAdd.play();
  };

  return (
    <div className="w-full p-6 bg-slate-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-yellow-300">Choice Options</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add a food item..."
          disabled={disabled}
          className="flex-grow p-3 bg-slate-700 text-white rounded-md border-2 border-slate-600 focus:border-yellow-400 focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={disabled || newItem.trim() === ''}
          className="px-6 py-3 font-semibold bg-yellow-500 text-slate-900 rounded-md hover:bg-yellow-400 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </form>
      <div className="max-h-80 overflow-y-auto pr-2">
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 bg-slate-700 rounded-md"
            >
              <span className="text-slate-200">{item}</span>
              <button
                onClick={() => onRemoveItem(index)}
                disabled={disabled}
                className="text-slate-400 hover:text-red-500 transition-colors disabled:text-gray-600 disabled:cursor-not-allowed"
                aria-label={`Remove ${item}`}
              >
                <TrashIcon className="w-5 h-5"/>
              </button>
            </li>
          ))}
           {items.length === 0 && (
            <p className="text-center text-slate-500 py-4">Add some food to get started!</p>
           )}
        </ul>
      </div>
    </div>
  );
};

export default MenuInput;
