
import { motion } from 'framer-motion';
import { WordData } from '@/lib/types';
import { Share2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

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

  // Social share function
  // const handleShare = async () => {
  //   const appUrl = window.location.origin;
  //   const shareText = `Check out this word: ${wordData.word} - ${wordData.meanings.join(', ')}. Learn more words at ${appUrl}`;
    
  //   if (navigator.share) {
  //     try {
  //       await navigator.share({
  //         title: `Moments: ${wordData.word}`,
  //         text: shareText,
  //         url: window.location.href,
  //       });
  //       toast({
  //         title: "Shared successfully",
  //         description: "The word has been shared!",
  //       });
  //     } catch (error) {
  //       console.error('Error sharing:', error);
  //       // Fallback to copy to clipboard
  //       copyToClipboard(shareText);
  //     }
  //   } else {
  //     // Fallback for browsers that don't support navigator.share
  //     copyToClipboard(shareText);
  //   }
  // };

  // // Copy to clipboard function
  // const copyToClipboard = (text: string) => {
  //   navigator.clipboard.writeText(text)
  //     .then(() => {
  //       toast({
  //         title: "Copied to clipboard",
  //         description: "Share it anywhere you want!",
  //       });
  //     })
  //     .catch((error) => {
  //       console.error('Failed to copy text:', error);
  //       toast({
  //         title: "Failed to copy",
  //         description: "Please try again or manually copy the text",
  //         variant: "destructive",
  //       });
  //     });
  // };

  const handleShare = async () => {
    const appUrl = window.location.origin;
    const shareText = `Check out "${wordData.word}": ${wordData.meanings.join(', ')}. Discover more at ${appUrl}`;
  
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Moments: ${wordData.word}`,
          text: shareText,
          url: window.location.href,
        });
        // Use the toast function correctly
        toast({
          title: "Shared successfully!",
          description: "The word has been shared.",
        });
      } catch (error) {
        console.error('Error sharing:', error);
        copyToClipboard(shareText); // Fallback to clipboard
      }
    } else {
      copyToClipboard(shareText); // Fallback for unsupported browsers
    }
  };
  
  // Helper function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Use the toast function correctly
      toast({
        title: "Copied to clipboard!",
        description: "The content has been copied to your clipboard.",
      });
    }).catch((error) => {
      console.error('Failed to copy:', error);
      // Use the toast function correctly
      toast({
        title: "Failed to copy",
        description: "Please copy the content manually.",
        variant: "destructive", // Optional: Use a destructive variant for errors
      });
    });
  };

  
  // Open search function
  const handleKnowMore = () => {
    const searchQuery = encodeURIComponent(`${wordData.word} ${wordData.language} meaning`);
    window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank', 'noopener,noreferrer');
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

        <motion.div 
          className="flex gap-3 pt-4 justify-end"
          variants={itemVariants}
        >
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1.5"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
            <span>Spread Word</span>
          </Button>
          
          <Button 
            variant="secondary" 
            size="sm" 
            className="flex items-center gap-1.5"
            onClick={handleKnowMore}
          >
            <ExternalLink className="h-4 w-4" />
            <span>Know More</span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WordCard;
