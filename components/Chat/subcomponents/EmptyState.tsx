import React from 'react';
import { Theme } from '../../../types';
import { THEME_STYLES } from '../../../constants';

interface EmptyStateProps {
  theme: Theme;
  icon: React.ReactNode;
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ theme, icon, message }) => {
  const styles = THEME_STYLES[theme];
  return (
    <div className={`flex flex-col items-center justify-center h-full opacity-50 select-none ${styles.text}`}>
      <div className="text-6xl mb-4 animate-bounce">{icon}</div>
      <div className="text-xl">{message}</div>
    </div>
  );
};

export const LoadingState: React.FC<{ theme: Theme; message: string }> = ({ theme, message }) => {
  const styles = THEME_STYLES[theme];
  return (
    <div className={`flex flex-col items-center justify-center h-full opacity-50 select-none ${styles.text}`}>
      <div className="text-4xl mb-4 animate-pulse">⏳</div>
      <div className="text-xl">{message}</div>
    </div>
  );
};
