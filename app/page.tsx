
"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiHeart, FiMoreHorizontal, FiHome, FiSearch, FiBell, FiPlus, FiUser } from "react-icons/fi";

interface Pin {
  id: string;
  src: string;
  alt: string;
}

const samplePins: Pin[] = [
  { id: '1', src: 'https://images.pexels.com/photos/3018997/pexels-photo-3018997.jpeg', alt: 'City skyline at dusk' },
  { id: '2', src: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg', alt: 'Mountains and fog' },
  { id: '3', src: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg', alt: 'Forest trail' },
  { id: '4', src: 'https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg', alt: 'Beach sunset' },
  { id: '5', src: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg', alt: 'Abstract textures' },
  { id: '6', src: 'https://images.pexels.com/photos/1108547/pexels-photo-1108547.jpeg', alt: 'Bird in flight' },
  // Add more pins as needed
];

export default function PinterestClone() {
  const [pins, setPins] = useState<Pin[]>([]);
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load sample pins
    setPins(samplePins);
    // Close menu on outside click
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpenId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSave = (id: string) => {
    setSaved(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMenu = (id: string) => {
    setMenuOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-800">
      {/* Sidebar */}
      <nav className="w-16 bg-white dark:bg-gray-900 border-r flex flex-col items-center py-4 space-y-4 sticky top-0">
        <FiHome size={24} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition" />
        <FiSearch size={24} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition" />
        <FiPlus size={24} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition" />
        <FiBell size={24} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition" />
        <FiUser size={24} className="mt-auto text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition" />
      </nav>

      <main className="flex-1">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 px-6 py-4 shadow-md flex items-center justify-between">
          <h1 className="text-xl font-extrabold text-gray-900 dark:text-white">Pinsta</h1>
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
            />
            <FiSearch size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </header>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 p-4">
          {pins.map(pin => (
            <motion.div
              key={pin.id}
              className="break-inside-avoid mb-4 relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={pin.src}
                alt={pin.alt}
                className="w-full rounded-lg object-cover shadow-lg"
              />

              {/* Save Button */}
              <motion.button
                onClick={() => toggleSave(pin.id)}
                aria-label={saved[pin.id] ? 'Unsave Pin' : 'Save Pin'}
                whileTap={{ scale: 0.9 }}
                className="absolute top-2 left-2 bg-white dark:bg-gray-900 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiHeart size={16} className={saved[pin.id] ? 'text-red-600' : 'text-gray-600 dark:text-gray-300'} />
              </motion.button>

              {/* More Actions Menu */}
              <div className="absolute top-2 right-2" ref={menuRef}>
                <button
                  onClick={() => toggleMenu(pin.id)}
                  aria-label="More actions"
                  className="bg-white dark:bg-gray-900 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <FiMoreHorizontal size={16} className="text-gray-600 dark:text-gray-300" />
                </button>
                {menuOpenId === pin.id && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
                  >
                    <ul className="text-gray-800 dark:text-gray-200">
                      <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Share</li>
                      <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">More like this</li>
                      <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Download</li>
                      <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Report Pin</li>
                    </ul>
                  </motion.div>
                )}
              </div>

              {/* Caption Overlay */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <p className="text-white text-sm font-medium">{pin.alt}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

