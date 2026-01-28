'use client';

import React, { createContext, useContext, useState } from 'react';
import { useTranslation } from '../translations';

const LanguageContext = createContext();

export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'ar', name: 'Darija', flag: '🇲🇦', nativeName: 'الدارجة' },
];

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
  const t = useTranslation(currentLanguage.code);

  const changeLanguage = (langCode) => {
    const lang = languages.find(l => l.code === langCode);
    if (lang) {
      setCurrentLanguage(lang);
    }
  };

  // This function returns the language instruction for Gemini API
  const getGeminiLanguagePrompt = () => {
    const languagePrompts = {
      en: 'Please respond in English.',
      fr: 'Veuillez répondre en français.',
      ar: 'الرجاء الرد باللغة العربية الدارجة المغربية.',
    };
    return languagePrompts[currentLanguage.code];
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      changeLanguage,
      languages,
      getGeminiLanguagePrompt,
      t,
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
