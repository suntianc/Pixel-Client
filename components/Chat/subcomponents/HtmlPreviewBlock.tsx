import React, { useState } from 'react';
import { Theme } from '../../../types';
import { THEME_STYLES } from '../../../constants';
import { Play, FileCode } from 'lucide-react';

interface HtmlPreviewBlockProps {
  code: string;
  theme: Theme;
  defaultPreview?: boolean;
}

export const HtmlPreviewBlock: React.FC<HtmlPreviewBlockProps> = ({ code, theme, defaultPreview = false }) => {
  const [showPreview, setShowPreview] = useState(defaultPreview);
  const styles = THEME_STYLES[theme];
  
  return (
    <div className={`my-4 ${styles.borderWidth} ${styles.borderColor} ${styles.shadow} ${styles.radius} overflow-hidden`}>
      <div className={`flex justify-between items-center bg-[#1e1e1e] text-gray-400 px-2 py-1 text-xs border-b ${styles.borderColor} font-bold font-mono`}>
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          <span className="uppercase text-blue-400">HTML {defaultPreview ? 'DOCUMENT' : 'SNIPPET'}</span>
        </div>
        <button 
          onClick={() => setShowPreview(!showPreview)}
          className={`
            flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
            transition-colors
            ${showPreview ? 'bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'}
          `}
        >
          {showPreview ? <Play size={10} /> : <FileCode size={10} />}
          {showPreview ? 'PREVIEW' : 'CODE'}
        </button>
      </div>
      
      {showPreview ? (
        <iframe
          srcDoc={code}
          className="w-full h-64 bg-white"
          title="HTML Preview"
          sandbox="allow-scripts"
        />
      ) : (
        <pre className="p-4 overflow-x-auto text-sm bg-[#1e1e1e] text-gray-300">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
};
