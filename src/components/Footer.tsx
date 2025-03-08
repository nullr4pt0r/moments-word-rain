
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Github, ExternalLink } from 'lucide-react';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userIp, setUserIp] = useState<string | null>(null);

  useEffect(() => {
    // Update time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Fetch IP address
    const fetchIp = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setUserIp(data.ip);
      } catch (error) {
        console.error('Failed to fetch IP:', error);
        setUserIp('Unable to fetch IP');
      }
    };

    fetchIp();

    return () => clearInterval(intervalId);
  }, []);

  // Format current time
  const formattedTime = currentTime.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });

  return (
    <motion.footer 
      className="w-full mt-auto py-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <a 
          href="https://lovable.ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-moments-primary-blue transition-colors"
        >
          <span>Built with Lovable</span>
          <ExternalLink className="h-3 w-3" />
        </a>
        
        <a 
          href="https://github.com/yourusername/moments" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-moments-primary-blue transition-colors"
        >
          <Github className="h-4 w-4" />
          <span>GitHub</span>
        </a>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{formattedTime}</span>
        </div>
        
        {userIp && (
          <div className="flex items-center gap-1">
            <span>IP: {userIp}</span>
          </div>
        )}
      </div>
    </motion.footer>
  );
};

export default Footer;
