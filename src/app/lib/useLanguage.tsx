"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language, TranslationKeys } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Load saved language from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('portfolio-language') as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fil')) {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-language', language);
    }
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Utility function for nested translation keys  
export function getNestedTranslation(obj: Record<string, unknown>, path: string): string {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = path.split('.').reduce((current: any, key) => current?.[key], obj);
    return typeof result === 'string' ? result : path;
  } catch {
    return path;
  }
}