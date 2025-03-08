
import { useState } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header 
      className="w-full py-6 px-6 sm:px-8 flex justify-center items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        <span className="text-moments-dark-gray">moments</span>
      </h1>
    </motion.header>
  );
};

export default Header;
