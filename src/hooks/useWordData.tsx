
import { useState, useEffect, useCallback } from 'react';
import { WordData } from '@/lib/types';
import { fetchWord, fallbackWordData } from '@/lib/api';
import { toast } from '@/components/ui/use-toast';

export function useWordData(selectedLanguage: string) {
  const [wordData, setWordData] = useState<WordData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchTime, setLastFetchTime] = useState<Date>(new Date());

  const fetchNewWord = useCallback(async () => {
    if (!selectedLanguage) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWord(selectedLanguage);
      setWordData(data);
      setLastFetchTime(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch word';
      setError(errorMessage);
      toast({
        title: "Error",
        description: `Could not fetch new word: ${errorMessage}`,
        variant: "destructive",
      });
      
      // Set fallback data if no data exists yet
      if (!wordData) {
        setWordData(fallbackWordData);
      }
    } finally {
      setLoading(false);
    }
  }, [selectedLanguage, wordData]);

  // Initial fetch
  useEffect(() => {
    fetchNewWord();
  }, [selectedLanguage]);

  // Auto refresh every minute
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNewWord();
    }, 60000); // 60000ms = 1 minute
    
    return () => clearInterval(interval);
  }, [fetchNewWord]);

  return {
    wordData,
    loading,
    error,
    fetchNewWord,
    lastFetchTime
  };
}
