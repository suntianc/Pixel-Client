
import React, { useState, useRef, useEffect } from 'react';
import { Theme } from '../types';
import { THEME_STYLES } from '../constants';
import { ChevronDown } from 'lucide-react';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme: Theme;
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: React.ReactNode;
}

export const PixelButton: React.FC<PixelButtonProps> = ({ 
  children, 
  theme, 
  variant = 'primary', 
  className = '', 
  icon,
  ...props 
}) => {
  const styles = THEME_STYLES[theme];
  
  let bgClass = styles.primary;
  let textClass = styles.primaryText;
  
  if (variant === 'secondary') {
    bgClass = styles.secondary;
    textClass = styles.secondaryText;
  } else if (variant === 'danger') {
    bgClass = 'bg-red-500 hover:bg-red-600';
    textClass = 'text-white';
  }

  return (
    <button
      className={`
        relative px-4 py-2 flex items-center justify-center gap-2
        ${styles.button}
        ${bgClass} ${textClass}
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {icon && <span className="w-4 h-4 flex items-center justify-center">{icon}</span>}
      {children}
    </button>
  );
};

interface PixelCardProps {
  theme: Theme;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const PixelCard: React.FC<PixelCardProps> = ({ theme, children, title, className = '' }) => {
  const styles = THEME_STYLES[theme];
  
  return (
    <div className={`
      relative p-4 ${styles.card} ${styles.radius} ${className}
    `}>
      {title && (
        <div className={`
          absolute -top-3 left-4 px-2 py-0.5
          ${styles.borderWidth} ${styles.borderColor} ${styles.primary} text-white
          text-xs font-bold uppercase tracking-wider ${styles.radius}
          ${styles.shadow === 'pixel-shadow' ? 'shadow-[2px_2px_0px_black]' : 'shadow-sm'}
        `}>
          {title}
        </div>
      )}
      {children}
    </div>
  );
};

interface PixelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  theme: Theme;
  label?: string;
}

export const PixelInput: React.FC<PixelInputProps> = ({ theme, label, className = '', ...props }) => {
  const styles = THEME_STYLES[theme];
  
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className={`text-xs font-bold uppercase ${styles.textMuted}`}>{label}</label>}
      <input
        className={`
          w-full p-2 outline-none 
          ${styles.borderWidth} ${styles.borderColor} ${styles.radius}
          ${styles.inputBg} ${styles.text}
          focus:border-blue-400
          transition-all duration-200
          placeholder-gray-500/50
          ${className}
        `}
        {...props}
      />
    </div>
  );
};

interface PixelSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  theme: Theme;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const PixelSelect: React.FC<PixelSelectProps> = ({ theme, label, children, className = '', value, onChange, disabled, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const styles = THEME_STYLES[theme];

    // Extract options from React children
    const options = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === 'option') {
            const props = child.props as React.OptionHTMLAttributes<HTMLOptionElement>;
            return {
                value: props.value,
                label: props.children,
                disabled: props.disabled
            };
        }
        return null;
    })?.filter(Boolean) || [];

    const selectedOption = options.find(o => o.value === value);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (val: string | number | readonly string[]) => {
        if (onChange) {
            // Create a synthetic event to mimic standard Select onChange
            const event = {
                target: { value: val, name: props.name },
                currentTarget: { value: val, name: props.name },
                preventDefault: () => {},
                stopPropagation: () => {},
                nativeEvent: new Event('change'),
                bubbles: true,
                cancelable: true,
                type: 'change'
            } as unknown as React.ChangeEvent<HTMLSelectElement>;
            
            onChange(event);
        }
        setIsOpen(false);
    };

    return (
        <div className={`flex flex-col gap-1 w-full ${className}`} ref={containerRef}>
            {label && <label className={`text-xs font-bold uppercase ${styles.textMuted}`}>{label}</label>}
            <div className="relative">
                {/* Trigger Area */}
                <div
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    className={`
                        w-full p-2 pr-8 flex items-center justify-between
                        ${styles.borderWidth} ${styles.borderColor} ${styles.radius}
                        ${styles.inputBg} ${styles.text}
                        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        ${isOpen ? 'border-blue-400' : ''}
                        select-none transition-colors duration-150
                    `}
                >
                    <span className="truncate block">{selectedOption?.label || value || "Select..."}</span>
                    <div className={`
                        absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none 
                        flex items-center justify-center opacity-70
                        ${styles.text}
                    `}>
                        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                </div>

                {/* Custom Dropdown Menu */}
                {isOpen && !disabled && (
                    <div className={`
                        absolute top-full left-0 w-full mt-1 z-[100]
                        max-h-60 overflow-y-auto
                        ${styles.borderWidth} ${styles.borderColor} ${styles.radius}
                        ${styles.inputBg} ${styles.text}
                        ${styles.shadow === 'pixel-shadow' ? 'shadow-[4px_4px_0px_black]' : 'shadow-xl'}
                    `}>
                        {options.map((option, idx) => (
                            <div
                                key={`${option.value}-${idx}`}
                                onClick={() => !option.disabled && handleSelect(option.value as any)}
                                className={`
                                    p-2 cursor-pointer text-sm
                                    border-b last:border-b-0 border-white/5
                                    hover:bg-black/10 transition-colors
                                    ${option.value === value ? 'bg-blue-500/20 font-bold' : ''}
                                    ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                                `}
                            >
                                {option.label}
                            </div>
                        ))}
                        {options.length === 0 && (
                            <div className="p-2 text-sm opacity-50 italic">No options</div>
                        )}
                    </div>
                )}
            </div>
            
            {/* Hidden native select for form data/accessibility fallback */}
            <select className="hidden" value={value} onChange={onChange} disabled={disabled} {...props}>
                {children}
            </select>
        </div>
    );
};

export const PixelBadge: React.FC<{ theme: Theme; children: React.ReactNode; color?: string }> = ({ theme, children, color }) => {
    const styles = THEME_STYLES[theme];
    const isPixel = styles.type === 'pixel';
    
    return (
        <span className={`
            inline-block px-2 py-0.5 text-[10px] font-bold 
            ${isPixel ? 'border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'rounded-full border border-transparent shadow-sm'}
            ${color ? color : (isPixel ? 'bg-gray-300 text-black' : 'bg-gray-100 text-gray-700')}
        `}>
            {children}
        </span>
    )
}
