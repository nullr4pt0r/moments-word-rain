
import { WordData } from './types';
import { v4 as uuidv4 } from 'uuid';

// Get or create a session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('sessionId');
  
  if (!sessionId) {
    sessionId = uuidv4();
    sessionStorage.setItem('sessionId', sessionId);
  }
  
  return sessionId;
};

// Sample language data by country
export const countryLanguages = [
  {
    countryCode: 'us',
    countryName: 'United States',
    languages: [
      { code: 'english', name: 'English', flag: 'us' }
    ]
  },
  {
    countryCode: 'fr',
    countryName: 'France',
    languages: [
      { code: 'french', name: 'French', flag: 'fr' }
    ]
  },
  {
    countryCode: 'nl',
    countryName: 'Netherlands',
    languages: [
      { code: 'dutch', name: 'Netherlands', flag: 'nl' }
    ]
  },
  {
    countryCode: 'ae',
    countryName: 'United Arab Emirates',
    languages: [
      { code: 'arabic', name: 'Arabic', flag: 'ae' }
    ]
  },
  {
    countryCode: 'pt',
    countryName: 'Portugal',
    languages: [
      { code: 'portuguese', name: 'Portuguese', flag: 'pt' }
    ]
  },
  {
    countryCode: 'in',
    countryName: 'India',
    languages: [
      { code: 'hindi', name: 'Hindi', flag: 'in' },
      { code: 'malayalam', name: 'Malayalam', flag: 'in' },
      { code: 'tamil', name: 'Tamil', flag: 'in' },
      { code: 'telugu', name: 'Telugu', flag: 'in' }
     
    ]
  },
  {
    countryCode: 'jp',
    countryName: 'Japan',
    languages: [
      { code: 'japanese', name: 'Japanese', flag: 'jp' }
    ]
  },
  {
    countryCode: 'cn',
    countryName: 'China',
    languages: [
      { code: 'mandarin', name: 'Mandarin', flag: 'cn' }
    ]
  },
{
    countryCode: 'kr',
    countryName: 'South Korea',
    languages: [
      { code: 'korean', name: 'Korean', flag: 'kr' }
    ]
  }
];

// Fallback data in case API fails
export const fallbackWordData: WordData = {
  word: "Eucatastrophe",
  language: "english",
  meanings: [
    "A sudden turn towards good"
  ],
  englishTranslation: "yoo-kuh-tass-truh-fee",
  remarks: [
    "A 'good catastrophe' in a story"
  ],
  phonetics: "yoo-kuh-TASS-truh-fee"
};

export const fetchWord = async (language: string): Promise<WordData> => {
  try {
    const sessionId = getSessionId();
    const response = await fetch(`http://localhost:9292/api/words?lang=${language}`, {
      headers: {
        'sessId': sessionId
      }
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch word data:', error);
    // Return fallback data for development
    return fallbackWordData;
  }
};
