
import React, { useState, useEffect, useRef } from 'react';
import { Theme, Message, LLMModel, LLMProvider } from '../types';
import { PixelButton, PixelInput } from './PixelUI';
import { streamChatResponse } from '../services/llmService';
import { THEME_STYLES } from '../constants';
import { Send, Mic, Paperclip, RotateCcw, Copy, Check, Search } from 'lucide-react';

interface ChatProps {
  theme: Theme;
  messages: Message[];
  activeModel: LLMModel | null;
  provider: LLMProvider | null;
  onSendMessage: (msg: Message) => void;
  onUpdateMessage: (id: string, content: string) => void;
  setMascotState: (state: 'idle' | 'thinking' | 'happy' | 'shocked') => void;
  onTriggerRainbow: () => void;
  searchQuery?: string;
}

const CopyButton: React.FC<{ content: string }> = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      className={`
        transition-all duration-200 p-1
        ${copied ? 'text-green-500 scale-125 opacity-100' : 'opacity-70 hover:opacity-100 hover:scale-110'}
      `} 
      onClick={handleCopy} 
      title={copied ? "Copied!" : "Copy"}
    >
      {copied ? <Check size={14}/> : <Copy size={14}/>}
    </button>
  );
};

export const Chat: React.FC<ChatProps> = ({ 
  theme, 
  messages, 
  activeModel, 
  provider,
  onSendMessage, 
  onUpdateMessage,
  setMascotState,
  onTriggerRainbow,
  searchQuery = ''
}) => {
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const styles = THEME_STYLES[theme];

  // Filter messages based on search query
  const displayMessages = searchQuery.trim()
    ? messages.filter(msg => 
        msg.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
        msg.role.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  useEffect(() => {
    // Only auto-scroll if not searching (to allow reading search results)
    if (scrollRef.current && !searchQuery) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, searchQuery]);

  const handleSend = async () => {
    // EASTER EGG: Hidden Command
    if (input.trim() === '/upup downdown left right') {
        onTriggerRainbow();
        setInput('');
        return;
    }

    if (!input.trim() || !activeModel || !provider || isStreaming) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    onSendMessage(userMsg);
    setInput('');
    setMascotState('thinking');
    setIsStreaming(true);

    // Create placeholder assistant message
    const botMsgId = (Date.now() + 1).toString();
    const botMsg: Message = {
      id: botMsgId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      modelId: activeModel.id
    };
    onSendMessage(botMsg);

    let fullContent = '';

    await streamChatResponse([userMsg], activeModel, provider, (chunk) => {
      fullContent += chunk;
      onUpdateMessage(botMsgId, fullContent);
    });

    setIsStreaming(false);
    setMascotState('happy');
    setTimeout(() => setMascotState('idle'), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isDisabled = (!activeModel || isStreaming) && input.trim() !== '/upup downdown left right';

  return (
    <div className="flex flex-col h-full relative z-10">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 relative z-10" ref={scrollRef}>
        {messages.length === 0 ? (
           <div className={`flex flex-col items-center justify-center h-full opacity-50 select-none ${styles.text}`}>
             <div className="text-6xl mb-4 animate-bounce">🎮</div>
             <div className="text-xl">SELECT A MODEL TO START</div>
           </div>
        ) : displayMessages.length === 0 ? (
           <div className={`flex flex-col items-center justify-center h-full opacity-50 select-none ${styles.text}`}>
             <div className="text-4xl mb-4">🔍</div>
             <div className="text-xl">NO MESSAGES FOUND</div>
           </div>
        ) : (
          displayMessages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`
                  max-w-[80%] p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                  ${msg.role === 'user' ? styles.primary + ' text-white' : styles.secondary + ' ' + styles.text}
                `}
              >
                <div className="flex justify-between items-center mb-2 gap-2">
                  <div className={`
                    text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border border-black
                    ${msg.role === 'user' ? 'bg-white text-black' : 'bg-black text-white'}
                    shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]
                  `}>
                    {msg.role}
                  </div>
                  {msg.role === 'assistant' && (
                     <CopyButton content={msg.content} />
                  )}
                </div>
                <div className="whitespace-pre-wrap leading-relaxed font-chat text-sm">
                  {msg.content || <span className="animate-pulse">...</span>}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className={`p-4 border-t-4 border-black ${styles.secondary} relative z-50`}>
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={activeModel ? `Message ${activeModel.name}...` : "Select a model from the sidebar to start..."}
            disabled={isDisabled && !input.startsWith('/')}
            className={`
              w-full p-3 pr-12 min-h-[60px] max-h-[200px] resize-none outline-none
              border-2 border-black 
              ${isDisabled ? 'bg-gray-200 cursor-not-allowed text-gray-500' : `${styles.inputBg} ${styles.text} focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]`}
              placeholder-current placeholder-opacity-50
              transition-all
              font-chat relative z-50
            `}
          />
          
          <div className="flex justify-between mt-2 items-center relative z-50">
             <div className="flex gap-2">
                <PixelButton theme={theme} variant="secondary" className="p-2 h-8 w-8" title="Upload File" disabled={isDisabled}>
                   <Paperclip size={16} />
                </PixelButton>
                <PixelButton theme={theme} variant="secondary" className="p-2 h-8 w-8" title="Voice Input" disabled={isDisabled}>
                   <Mic size={16} />
                </PixelButton>
             </div>
             
             <div className="flex gap-2">
                {isStreaming && (
                   <div className={`flex items-center mr-4 ${styles.text}`}>
                     <span className="animate-spin mr-2">★</span> GENERATING
                   </div>
                )}
                <PixelButton 
                    theme={theme} 
                    onClick={handleSend} 
                    disabled={(!input.trim() && !input.startsWith('/')) || isDisabled}
                    className="w-32"
                >
                    {isStreaming ? 'STOP' : 'SEND'} <Send size={16} />
                </PixelButton>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
