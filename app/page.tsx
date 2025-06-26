"use client";

import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Theme Context
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Icon Components
const SearchIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const SunIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const HomeIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const CompassIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9a9 9 0 01-9-9m9 9c0 5-4 9-9 9s-9-4-9-9m9 9c0-5-4-9-9-9s-9 4-9 9" />
  </svg>
);

const PlusIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const HeartIcon = ({ filled = false }) => (
  <svg className="h-5 w-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const BookmarkIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
);

const UserIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const MoreHorizontalIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const ShareIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

// Mock Data
const mockPins = [
  // Home decor inspiration
  { id: 1, title: 'Modern Living Room Design', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600', category: 'Home Decor', width: 400, height: 600 },
  { id: 2, title: 'Cozy Bedroom Ideas', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500', category: 'Home Decor', width: 400, height: 500 },
  { id: 3, title: 'Kitchen Organization', imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=650', category: 'Home Decor', width: 400, height: 650 },
  { id: 4, title: 'Bathroom Renovation', imageUrl: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=550', category: 'Home Decor', width: 400, height: 550 },
  { id: 5, title: 'Reading Nook Ideas', imageUrl: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600', category: 'Home Decor', width: 400, height: 600 },
  { id: 6, title: 'Dining Room Inspiration', imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500', category: 'Home Decor', width: 400, height: 500 },
  { id: 7, title: 'Plant Decoration Ideas', imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=650', category: 'Home Decor', width: 400, height: 650 },
  { id: 8, title: 'Minimalist Home Office', imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600', category: 'Home Decor', width: 400, height: 600 },
  
  // Fashion photography
  { id: 9, title: 'Summer Fashion Trends', imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600', category: 'Fashion', width: 400, height: 600 },
  { id: 10, title: 'Street Style Photography', imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=650', category: 'Fashion', width: 400, height: 650 },
  { id: 11, title: 'Winter Coat Collection', imageUrl: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500', category: 'Fashion', width: 400, height: 500 },
  { id: 12, title: 'Casual Weekend Outfit', imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600', category: 'Fashion', width: 400, height: 600 },
  { id: 13, title: 'Evening Dress Ideas', imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=550', category: 'Fashion', width: 400, height: 550 },
  { id: 14, title: 'Minimalist Wardrobe', imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600', category: 'Fashion', width: 400, height: 600 },
  { id: 15, title: 'Accessory Styling', imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=650', category: 'Fashion', width: 400, height: 650 },
  { id: 16, title: 'Vintage Fashion Inspiration', imageUrl: 'https://images.unsplash.com/photo-1467632499275-7a693a761056?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500', category: 'Fashion', width: 400, height: 500 },
  
  // Food photography
  { id: 17, title: 'Gourmet Pizza Recipe', imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600', category: 'Food', width: 400, height: 600 },
  { id: 18, title: 'Fresh Sushi Platter', imageUrl: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500', category: 'Food', width: 400, height: 500 },
  { id: 19, title: 'Healthy Breakfast Bowl', imageUrl: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=650', category: 'Food', width: 400, height: 650 },
  { id: 20, title: 'Chocolate Dessert Art', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=550', category: 'Food', width: 400, height: 550 },
  { id: 21, title: 'Farm-to-Table Salad', imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600', category: 'Food', width: 400, height: 600 },
  { id: 22, title: 'Artisan Bread Baking', imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500', category: 'Food', width: 400, height: 500 },
  
  // Travel destinations
  { id: 23, title: 'Santorini Sunset Views', imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=650', category: 'Travel', width: 400, height: 650 },
  { id: 24, title: 'Maldives Beach Resort', imageUrl: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600', category: 'Travel', width: 400, height: 600 },
  { id: 25, title: 'Tokyo Street Culture', imageUrl: 'https://images.unsplash.com/photo-1502780402662-acc01917949e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500', category: 'Travel', width: 400, height: 500 },
  { id: 26, title: 'Swiss Alps Adventure', imageUrl: 'https://images.unsplash.com/photo-1458906931852-47d88574a008?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600', category: 'Travel', width: 400, height: 600 },
  { id: 27, title: 'New York City Skyline', imageUrl: 'https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=550', category: 'Travel', width: 400, height: 550 },
  { id: 28, title: 'Bali Temple Architecture', imageUrl: 'https://images.unsplash.com/photo-1468413253725-0d5181091126?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=650', category: 'Travel', width: 400, height: 650 },
  { id: 29, title: 'Iceland Northern Lights', imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600', category: 'Travel', width: 400, height: 600 },
  { id: 30, title: 'Dubai Desert Safari', imageUrl: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500', category: 'Travel', width: 400, height: 500 },
  
  // Art and design
  { id: 31, title: 'Abstract Digital Art', imageUrl: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600', category: 'Art', width: 400, height: 600 },
  { id: 32, title: 'Watercolor Painting', imageUrl: 'https://images.unsplash.com/photo-1533709752211-118fcaf03312?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=650', category: 'Art', width: 400, height: 650 },
  { id: 33, title: 'Sculpture Exhibition', imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500', category: 'Art', width: 400, height: 500 },
  { id: 34, title: 'Typography Design', imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600', category: 'Art', width: 400, height: 600 },
  { id: 35, title: 'Digital Illustration', imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0dd59a7b051?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=550', category: 'Art', width: 400, height: 550 },
  { id: 36, title: 'Gallery Wall Ideas', imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=650', category: 'Art', width: 400, height: 650 }
];

// Custom Hook for Toast Notifications
interface ToastData {
  message: string;
  type: 'success' | 'error';
}

function useToast() {
  const [toast, setToast] = useState<ToastData | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return { toast, showToast };
}

// Toast Component
function Toast({ toast, onClose }: { toast: ToastData | null; onClose: () => void }) {
  if (!toast) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg ${
        toast.type === 'error' 
          ? 'bg-red-600 text-white' 
          : 'bg-green-600 text-white'
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{toast.message}</span>
        <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
          ×
        </button>
      </div>
    </motion.div>
  );
}

// Masonry Grid Component
function MasonryGrid({ children, className = '' }: { children: React.ReactNode[]; className?: string }) {
  const [columns, setColumns] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      
      if (containerWidth >= 1536) setColumns(6);
      else if (containerWidth >= 1280) setColumns(5);
      else if (containerWidth >= 1024) setColumns(4);
      else if (containerWidth >= 768) setColumns(3);
      else if (containerWidth >= 640) setColumns(2);
      else setColumns(1);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const columnGroups = Array.from({ length: columns }, () => [] as React.ReactNode[]);
  
  children.forEach((child, index) => {
    const columnIndex = index % columns;
    columnGroups[columnIndex].push(child);
  });

  return (
    <div ref={containerRef} className={`flex gap-4 ${className}`}>
      {columnGroups.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-4 flex-1">
          {column.map((item, itemIndex) => (
            <motion.div
              key={`${columnIndex}-${itemIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6,
                delay: itemIndex * 0.1,
                ease: "easeOut"
              }}
            >
              {item}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Pin Card Component
function PinCard({ pin, savedPins, onToggleSave }: { pin: any; savedPins: number[]; onToggleSave: (pinId: number) => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { showToast } = useToast();

  const isSaved = savedPins.includes(pin.id);

  const handleSave = () => {
    onToggleSave(pin.id);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Link copied to clipboard');
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pin.imageUrl;
    link.download = `${pin.title}.jpg`;
    link.target = '_blank';
    link.click();
    showToast('Download started');
  };

  const handleView = () => {
    window.open(pin.imageUrl, '_blank');
  };

  return (
    <motion.div
      className="relative"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div
        className="relative overflow-hidden bg-white dark:bg-gray-900 border-0 shadow-lg hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-black/40 transition-shadow duration-300 group cursor-pointer rounded-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={pin.imageUrl}
            alt={pin.title}
            className={`w-full h-auto object-cover transition-opacity duration-300 rounded-2xl ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div 
              className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-2xl"
              style={{ aspectRatio: `${pin.width}/${pin.height}` }}
            />
          )}

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Top Actions */}
            <div className="absolute top-4 right-4 flex gap-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 0.8
                }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <button
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    isSaved 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                  onClick={handleSave}
                >
                  {isSaved ? 'Saved' : 'Save'}
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 0.8
                }}
                transition={{ duration: 0.2, delay: 0.15 }}
                className="relative"
              >
                <button
                  className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-700 p-0 flex items-center justify-center"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <MoreHorizontalIcon />
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 top-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 w-48 z-10">
                    <button
                      onClick={handleShare}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <ShareIcon />
                      <span className="ml-2">Share</span>
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <DownloadIcon />
                      <span className="ml-2">Download</span>
                    </button>
                    <button
                      onClick={handleView}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <ExternalLinkIcon />
                      <span className="ml-2">View full size</span>
                    </button>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-4 left-4 right-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 10
                }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2">
                  {pin.title}
                </h3>
                <p className="text-white/80 text-sm capitalize">
                  {pin.category}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Save Button (always visible on mobile) */}
          <div className="absolute top-4 right-4 sm:hidden">
            <button
              className={`w-8 h-8 rounded-full ${
                isSaved 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-red-600 hover:bg-red-700 text-white'
              } flex items-center justify-center`}
              onClick={handleSave}
            >
              <HeartIcon filled={isSaved} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Header Component
function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 19c-.9 0-1.6-.7-1.6-1.6V14c0-.9-.7-1.6-1.6-1.6H5.6c-.9 0-1.6-.7-1.6-1.6S4.7 9.2 5.6 9.2h3.2c.9 0 1.6-.7 1.6-1.6V4.4c0-.9.7-1.6 1.6-1.6s1.6.7 1.6 1.6v3.2c0 .9.7 1.6 1.6 1.6h3.2c.9 0 1.6.7 1.6 1.6s-.7 1.6-1.6 1.6h-3.2c-.9 0-1.6.7-1.6 1.6v3.2c0 .9-.7 1.6-1.6 1.6z"/>
            </svg>
          </div>
          <span className="font-bold text-xl hidden sm:block text-gray-900 dark:text-white">
            Pinsta
          </span>
        </div>
        
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search for ideas..."
              className="w-full h-12 pl-12 pr-4 bg-gray-100 dark:bg-gray-900 border-none rounded-full text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 p-0 flex items-center justify-center"
            >
              {theme === 'dark' ? (
                <div className="text-yellow-500"><SunIcon /></div>
              ) : (
                <div className="text-gray-600"><MoonIcon /></div>
              )}
            </button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="w-8 h-8 bg-red-600 rounded-full hover:bg-red-700 p-0 flex items-center justify-center">
              <div className="text-white"><UserIcon /></div>
            </button>
          </motion.div>
        </div>
      </div>
    </header>
  );
}

// Sidebar Component
function Sidebar() {
  const [activeItem, setActiveItem] = useState(0);

  const navItems = [
    { icon: HomeIcon, label: 'Home', active: true },
    { icon: CompassIcon, label: 'Explore', active: false },
    { icon: PlusIcon, label: 'Create', active: false },
    { icon: HeartIcon, label: 'Saved', active: false },
    { icon: BookmarkIcon, label: 'Boards', active: false },
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-16 lg:w-20 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-r border-gray-200 dark:border-gray-800 z-40">
      <nav className="h-full flex flex-col items-center py-8 space-y-6">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === activeItem;
          
          return (
            <motion.div
              key={item.label}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => setActiveItem(index)}
                className={`w-10 h-10 rounded-full p-0 transition-all duration-200 flex items-center justify-center ${
                  isActive
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                <Icon />
              </button>
            </motion.div>
          );
        })}
      </nav>
    </aside>
  );
}

// Main Pinsta Component
function PinstaApp() {
  const [savedPins, setSavedPins] = useState<number[]>([]);
  const { toast, showToast } = useToast();

  const handleToggleSave = (pinId: number) => {
    setSavedPins(prev => {
      const isSaved = prev.includes(pinId);
      if (isSaved) {
        showToast('Pin removed from saved');
        return prev.filter(id => id !== pinId);
      } else {
        showToast('Pin saved successfully');
        return [...prev, pinId];
      }
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      <Sidebar />
      
      <main className="ml-16 lg:ml-20 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <MasonryGrid>
            {mockPins.map((pin) => (
              <PinCard 
                key={pin.id} 
                pin={pin} 
                savedPins={savedPins}
                onToggleSave={handleToggleSave}
              />
            ))}
          </MasonryGrid>
        </div>
      </main>

      <Toast toast={toast} onClose={() => {}} />
    </div>
  );
}

// Theme Provider Component
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme;
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const resolved = stored || preferred;

    setTheme(resolved);
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
    root.setAttribute('data-theme', resolved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(newTheme);
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  if (!theme) return null; // ⛔ wait until hydration

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Main Page Component
export default function Page() {
  return (
    <ThemeProvider>
      <>
      <style dangerouslySetInnerHTML={{
        __html: `
          html[data-theme='dark'] {
            color-scheme: dark;
          }

          html[data-theme='light'] {
            color-scheme: light;
          }

          html {
            scroll-behavior: smooth;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
          }

          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .backdrop-blur-xl {
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
          }

          ::-webkit-scrollbar {
            width: 6px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
          }

          ::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 3px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.5);
          }

          img {
            transition: opacity 0.3s ease;
          }
        `
      }} />
        <PinstaApp />
      </>
    </ThemeProvider>
  );
}