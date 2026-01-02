'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface TranslationContextType {
  language: string;
  setLanguage: (lang: string) => void;
  isLoading: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<string>('en');
  const [isLoading, setIsLoading] = useState(false);

  // Only keep state for LanguageSwitcher compatibility
  return (
    <TranslationContext.Provider value={{ language, setLanguage, isLoading }}>
      <style>{`
        .goog-te-banner { display: none !important; }
        .goog-te-gadget { font-family: inherit; }
        .goog-te-gadget-simple { background-color: transparent; border: none; }
      `}</style>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
