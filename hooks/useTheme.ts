import { useState, useEffect, useCallback } from 'react';
import { Theme } from '../types';
import { THEME_STYLES } from '../constants';

export const useTheme = (initialTheme: Theme = Theme.MODERN_DARK) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const styles = THEME_STYLES[theme];

  useEffect(() => {
    const saved = localStorage.getItem('pixel_theme') as Theme;
    if (saved && Object.values(Theme).includes(saved)) {
      setTheme(saved);
    }
  }, []);

  const changeTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('pixel_theme', newTheme);
  }, []);

  return { theme, setTheme: changeTheme, styles, isPixel: styles.type === 'pixel' };
};

export const useLanguage = (initialLanguage: 'en' | 'zh' | 'ja' = 'zh') => {
  const [language, setLanguage] = useState<'en' | 'zh' | 'ja'>(initialLanguage);

  useEffect(() => {
    const saved = localStorage.getItem('pixel_language') as 'en' | 'zh' | 'ja';
    if (saved && ['en', 'zh', 'ja'].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  const changeLanguage = useCallback((newLang: 'en' | 'zh' | 'ja') => {
    setLanguage(newLang);
    localStorage.setItem('pixel_language', newLang);
  }, []);

  return { language, setLanguage: changeLanguage };
};

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
};
