
export interface WordData {
  word: string;
  language: string;
  meanings: string[];
  englishTranslation: string;
  remarks: string[];
  phonetics: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface CountryLanguages {
  countryCode: string;
  countryName: string;
  languages: Language[];
}

export interface FlagOption {
  countryCode: string;
  countryName: string;
}
