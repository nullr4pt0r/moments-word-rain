
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    // Set initial theme
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <motion.header 
      className="w-full py-6 px-6 sm:px-8 flex justify-between items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        <span className="text-moments-dark-gray dark:text-white">moments</span>
      </h1>
      
      <div className="flex items-center gap-2">
        <Sun className="h-4 w-4 text-moments-dark-gray dark:text-white" />
        <Switch 
          checked={isDarkMode}
          onCheckedChange={toggleDarkMode}
        />
        <Moon className="h-4 w-4 text-moments-dark-gray dark:text-white" />
      </div>
    </motion.header>
  );
};

export default Header;
