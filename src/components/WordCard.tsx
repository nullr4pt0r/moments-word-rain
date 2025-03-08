
import { motion } from 'framer-motion';
import { WordData } from '@/lib/types';

interface WordCardProps {
  wordData: WordData | null;
  loading: boolean;
  lastFetchTime: Date;
}

const WordCard = ({ wordData, loading, lastFetchTime }: WordCardProps) => {
  if (loading && !wordData) {
    return (
      <motion.div
        className="w-full max-w-xl p-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex flex-col gap-4 items-center">
          <div className="h-8 w-48 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
          <div className="h-4 w-32 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
          <div className="h-16 w-full rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
          <div className="h-10 w-3/4 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
        </div>
      </motion.div>
    );
  }

  if (!wordData) {
    return null;
  }

  // Format last fetch time
  const formatTime = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    }).format(date);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
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
    <motion.div
      className="w-full max-w-xl p-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      key={wordData.word} // Force re-render when word changes
    >
      <div className="flex flex-col gap-6">
        <div className="space-y-1">
          <motion.div 
            className="flex items-center justify-between"
            variants={itemVariants}
          >
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {wordData.language}
            </span>
            <span className="text-xs text-gray-400">
              Updated at {formatTime(lastFetchTime)}
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight"
            variants={itemVariants}
          >
            {wordData.word}
          </motion.h2>
          
          {wordData.phonetics && (
            <motion.div 
              className="text-sm text-gray-600 dark:text-gray-300 font-light"
              variants={itemVariants}
            >
              /{wordData.phonetics}/ · {wordData.englishTranslation}
            </motion.div>
          )}
        </div>
        
        <motion.div 
          className="space-y-4"
          variants={itemVariants}
        >
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">Meaning</h3>
            <ul className="space-y-2">
              {wordData.meanings.map((meaning, index) => (
                <motion.li
                  key={index}
                  className="pl-4 border-l-2 border-moments-primary-blue text-gray-800 dark:text-gray-100"
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  {meaning}
                </motion.li>
              ))}
            </ul>
          </div>
          
          {wordData.remarks && wordData.remarks.length > 0 && (
            <motion.div 
              className="space-y-2 pt-2"
              variants={itemVariants}
            >
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">Remarks</h3>
              <div className="space-y-1.5">
                {wordData.remarks.map((remark, index) => (
                  <motion.div 
                    key={index}
                    className="text-sm text-gray-700 dark:text-gray-300 italic"
                    variants={itemVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    "{remark}"
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WordCard;
