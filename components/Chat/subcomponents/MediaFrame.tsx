import React from 'react';
import { Theme } from '../../../types';
import { THEME_STYLES } from '../../../constants';

interface MediaFrameProps {
  theme: Theme;
  children: React.ReactNode;
  label: string;
  icon: React.ReactNode;
}

export const MediaFrame: React.FC<MediaFrameProps> = ({ theme, children, label, icon }) => {
  const styles = THEME_STYLES[theme];
  return (
    <div className={`my-4 ${styles.borderWidth} ${styles.borderColor} ${styles.radius} overflow-hidden ${styles.inputBg} ${styles.shadow}`}>
      <div className={`flex items-center gap-2 px-3 py-1 text-xs font-bold border-b ${styles.borderColor} ${styles.secondary} ${styles.secondaryText}`}>
        {icon}
        <span className="uppercase tracking-wider">{label}</span>
      </div>
      <div className="relative">
        {children}
      </div>
    </div>
  );
};
