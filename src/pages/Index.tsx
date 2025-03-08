
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import LanguageSelector from '@/components/LanguageSelector';
import WordCard from '@/components/WordCard';
import { useWordData } from '@/hooks/useWordData';

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('english');
  const { wordData, loading, error, fetchNewWord, lastFetchTime } = useWordData(selectedLanguage);
  
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    toast({
      title: "Language Changed",
      description: `Selected language: ${language.charAt(0).toUpperCase() + language.slice(1)}`,
    });
  };
  
  const handleNewWordClick = () => {
    fetchNewWord();
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <motion.main
        className="container px-4 py-8 flex flex-col items-center gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="w-full max-w-xl flex flex-col sm:flex-row items-center justify-between gap-4 px-2"
          variants={itemVariants}
        >
          <LanguageSelector 
            selectedLanguage={selectedLanguage} 
            onSelectLanguage={handleLanguageChange} 
          />
          
          <Button
            onClick={handleNewWordClick}
            className="h-10 px-4 rounded-full bg-moments-primary-blue hover:bg-moments-secondary-blue text-white flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Search className="h-4 w-4" />
            <span>New Word</span>
          </Button>
        </motion.div>
        
        <motion.div
          className="w-full flex justify-center"
          variants={itemVariants}
        >
          <AnimatePresence mode="wait">
            <WordCard 
              key={`${selectedLanguage}-${lastFetchTime.getTime()}`}
              wordData={wordData} 
              loading={loading} 
              lastFetchTime={lastFetchTime} 
            />
          </AnimatePresence>
        </motion.div>
        
        <motion.div 
          className="text-center text-sm text-gray-500 mt-8"
          variants={itemVariants}
        >
          <p>Words update automatically every minute</p>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default Index;
