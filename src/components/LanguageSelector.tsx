
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, Globe } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { countryLanguages } from '@/lib/api';
import { FlagOption, Language } from '@/lib/types';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onSelectLanguage: (language: string) => void;
}

const LanguageSelector = ({ selectedLanguage, onSelectLanguage }: LanguageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<FlagOption | null>(null);
  const [showLanguages, setShowLanguages] = useState(false);
  
  // Find the country that contains the selected language
  const getCurrentCountry = (): FlagOption | null => {
    for (const country of countryLanguages) {
      const hasLanguage = country.languages.some(lang => lang.code === selectedLanguage);
      if (hasLanguage) {
        return {
          countryCode: country.countryCode,
          countryName: country.countryName
        };
      }
    }
    return null;
  };
  
  // Get available languages for the selected country
  const getLanguagesForCountry = (): Language[] => {
    if (!selectedCountry) return [];
    
    const country = countryLanguages.find(c => c.countryCode === selectedCountry.countryCode);
    return country ? country.languages : [];
  };
  
  // Handle country selection
  const handleCountrySelect = (country: FlagOption) => {
    setSelectedCountry(country);
    setShowLanguages(true);
    
    // If the country has only one language, select it automatically
    const languages = countryLanguages.find(c => c.countryCode === country.countryCode)?.languages;
    if (languages && languages.length === 1) {
      onSelectLanguage(languages[0].code);
      setIsOpen(false);
      setShowLanguages(false);
    }
  };
  
  // Handle language selection
  const handleLanguageSelect = (languageCode: string) => {
    onSelectLanguage(languageCode);
    setIsOpen(false);
    setShowLanguages(false);
  };
  
  // Get current country or default to US
  const currentCountry = selectedCountry || getCurrentCountry() || { countryCode: 'us', countryName: 'United States' };
  
  // Get flag URL
  const getFlagUrl = (countryCode: string) => {
    return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
  };
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline"
          className="flex items-center gap-2 h-10 px-3 rounded-full border border-gray-200 hover:border-gray-300 transition-all bg-white/80 backdrop-blur-sm"
          onClick={() => {
            setIsOpen(true);
            setShowLanguages(false);
          }}
        >
          <img 
            src={getFlagUrl(currentCountry.countryCode)} 
            alt={currentCountry.countryName}
            className="h-5 w-auto object-contain rounded-sm"
          />
          <span className="text-sm font-medium text-gray-700">
            {selectedLanguage ? selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1) : 'Select Language'}
          </span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-64 p-2 rounded-xl shadow-lg backdrop-blur-md bg-white/90 border border-gray-100">
        <AnimatePresence mode="wait">
          {!showLanguages ? (
            <motion.div
              key="countries"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-1"
            >
              <div className="px-2 py-1.5 text-sm font-medium text-gray-500">Select Country</div>
              <div className="max-h-64 overflow-y-auto pr-1">
                {countryLanguages.map((country) => (
                  <motion.button
                    key={country.countryCode}
                    className="flex items-center gap-3 w-full px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors text-left"
                    onClick={() => handleCountrySelect({
                      countryCode: country.countryCode,
                      countryName: country.countryName
                    })}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img 
                      src={getFlagUrl(country.countryCode)} 
                      alt={country.countryName}
                      className="h-5 w-auto object-contain rounded-sm"
                    />
                    <span className="text-sm font-medium text-gray-800">{country.countryName}</span>
                    {country.languages.length > 1 && (
                      <span className="ml-auto text-xs text-gray-400">{country.languages.length} languages</span>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="languages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-1"
            >
              <div className="flex items-center gap-2 px-2 py-1.5">
                <button 
                  onClick={() => setShowLanguages(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ChevronDown className="h-4 w-4 rotate-90" />
                </button>
                <span className="text-sm font-medium text-gray-500">
                  Languages in {selectedCountry?.countryName}
                </span>
              </div>
              <div className="max-h-64 overflow-y-auto pr-1">
                {getLanguagesForCountry().map((language) => (
                  <motion.button
                    key={language.code}
                    className="flex items-center gap-3 w-full px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors text-left"
                    onClick={() => handleLanguageSelect(language.code)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Globe className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-800">
                      {language.name}
                    </span>
                    {language.code === selectedLanguage && (
                      <Check className="ml-auto h-4 w-4 text-green-500" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSelector;
