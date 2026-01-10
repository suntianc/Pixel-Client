
import React, { useState, useEffect, useRef, useMemo, useLayoutEffect, useCallback } from 'react';
import { Theme, Message, LLMModel, LLMProvider, Language } from '../types';
import { PixelButton } from './PixelUI';
import { THEME_STYLES, TRANSLATIONS } from '../constants';
import { Send, Copy, Check, Moon, Sun, Star, Cpu, Globe, Palette, Loader2, Brain, ChevronDown, ChevronRight, Play, Maximize, FileCode, Box, Terminal, Paperclip, X, Square, Circle, Zap, Sunset } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { MermaidBlock } from './MermaidBlock';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ChatProps {
  theme: Theme;
  language: Language;
  messages: Message[];
  activeModel: LLMModel | null;
  provider: LLMProvider | null;
  onSendMessage: (msg: Message, options?: { deepThinkingEnabled: boolean }) => void;
  onUpdateMessage: (id: string, content: string) => void;
  onTriggerRainbow: () => void;
  setTheme: (theme: Theme) => void;
  setLanguage: (lang: Language) => void;
  isMoonlightUnlocked: boolean;
  searchQuery?: string;
  onStop?: () => void;
  isStreaming?: boolean;
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
        transition-all duration-200 p-1 rounded
        ${copied ? 'text-green-500 scale-125 opacity-100' : 'opacity-70 hover:opacity-100 hover:scale-110'}
      `} 
      onClick={handleCopy} 
      title={copied ? "Copied!" : "Copy"}
    >
      {copied ? <Check size={14}/> : <Copy size={14}/>}
    </button>
  );
};

// Suggestion Grid Component for empty state
const SuggestionGrid: React.FC<{ onSelect: (text: string) => void; theme: Theme }> = ({ onSelect, theme }) => {
  const styles = THEME_STYLES[theme];
  const isPixel = styles.type === 'pixel';

  const suggestions = [
    { icon: "💻", text: "解释这段代码的逻辑" },
    { icon: "🎨", text: "为我的项目设计配色方案" },
    { icon: "📝", text: "帮我润色这篇文档" },
    { icon: "🐛", text: "如何调试 React useEffect 闭包陷阱?" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto mt-8 px-4 animate-suggestion-in">
      {suggestions.map((s, i) => (
        <button 
          key={i}
          onClick={() => onSelect(s.text)}
          className={`
            p-4 text-left rounded-xl transition-all duration-200
            ${isPixel 
              ? 'border-2 border-current hover:translate-x-1 hover:-translate-y-1' 
              : 'border border-white/10 bg-white/5 hover:bg-white/10 hover:shadow-lg hover:-translate-y-0.5'
            }
          `}
        >
          <div className="text-xl mb-2">{s.icon}</div>
          <div className="text-sm opacity-80">{s.text}</div>
        </button>
      ))}
    </div>
  );
};

// --- MEDIA COMPONENTS ---

const MediaFrame: React.FC<{ theme: Theme; children: React.ReactNode; label: string; icon: React.ReactNode }> = ({ theme, children, label, icon }) => {
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

interface HtmlPreviewBlockProps {
    code: string;
    theme: Theme;
    defaultPreview?: boolean;
}

const HtmlPreviewBlock: React.FC<HtmlPreviewBlockProps> = ({ code, theme, defaultPreview = false }) => {
    const [showPreview, setShowPreview] = useState(defaultPreview);
    const styles = THEME_STYLES[theme];
    
    return (
        <div className={`my-4 ${styles.borderWidth} ${styles.borderColor} ${styles.shadow} ${styles.radius} overflow-hidden max-w-full`}>
             <div className={`flex justify-between items-center bg-[#1e1e1e] text-gray-400 px-2 py-1 text-xs border-b ${styles.borderColor} font-bold font-mono shrink-0`}>
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
                    {showPreview ? <FileCode size={12} /> : <Maximize size={12} />}
                    {showPreview ? "VIEW CODE" : "RUN PREVIEW"}
                </button>
            </div>
            
            {showPreview ? (
                 <div className="bg-white w-full h-[500px] relative resize-y overflow-x-auto overflow-y-hidden">
                     <iframe 
                        srcDoc={code}
                        className="w-full h-full min-w-[100%] border-none"
                        sandbox="allow-scripts allow-forms allow-modals allow-popups allow-presentation allow-same-origin"
                        title="HTML Preview"
                    />
                </div>
            ) : (
                <div className="max-h-[500px] overflow-auto">
                    <SyntaxHighlighter
                        style={vscDarkPlus}
                        language="html"
                        PreTag="div"
                        customStyle={{ 
                            margin: 0, 
                            borderRadius: 0, 
                            fontFamily: '"VT323", monospace', 
                            fontSize: '16px', 
                            lineHeight: '1.4',
                            background: '#1e1e1e',
                            maxWidth: '100%',
                            wordBreak: 'break-all',
                            overflowWrap: 'break-word'
                        }}
                        wrapLines={true}
                    >
                        {code}
                    </SyntaxHighlighter>
                </div>
            )}
        </div>
    );
};

const getMediaType = (url: string) => {
    if (!url) return 'link';
    // Robustly handle query params and hash for extension detection
    const cleanUrl = url.split('?')[0].split('#')[0].toLowerCase();
    
    if (cleanUrl.match(/\.(mp4|webm|mov|mkv)$/)) return 'video';
    if (cleanUrl.match(/\.(mp3|wav|ogg|m4a)$/)) return 'audio';
    if (cleanUrl.match(/\.(glb|gltf)$/)) return 'model';
    if (cleanUrl.match(/\.html?$/)) return 'html';
    // Added image extensions support for auto-rendering
    if (cleanUrl.match(/\.(jpeg|jpg|png|gif|webp|svg|bmp|ico|tiff)$/)) return 'image';
    return 'link';
};


// Memoized Markdown Renderer with code block caching
const MarkdownRenderer: React.FC<{ text: string; theme: Theme }> = React.memo(({ text, theme }) => {
    const styles = THEME_STYLES[theme];
    const isPixel = styles.type === 'pixel';

    // Cache for syntax highlighted code blocks to avoid re-rendering
    const codeBlockCache = useRef(new Map<string, React.ReactNode>());

    // Preprocess LaTeX: convert DeepSeek's \[ \] and \( \) to $$ $ and $ $
    const preprocessLaTeX = (content: string) => {
        return content
            .replace(/\\\[([\s\S]*?)\\\]/g, '$$$1$$')  // block formulas
            .replace(/\\\(([\s\S]*?)\\\)/g, '$$$1$$'); // inline formulas
    };

    const processedText = useMemo(() => preprocessLaTeX(text), [text]);

    const getCachedCodeBlock = (code: string, lang: string): React.ReactNode => {
        const cacheKey = `${lang}:${code.substring(0, 200)}`;
        if (!codeBlockCache.current.has(cacheKey)) {
            const result = (
                <div className={`my-4 ${styles.borderWidth} ${styles.borderColor} ${styles.shadow} ${styles.radius} overflow-hidden`}>
                    <div className={`
                        flex justify-between items-center px-3 py-1.5 text-xs select-none
                        bg-[#2d2d2d] border-b border-black/50 text-gray-400
                        ${isPixel ? 'font-pixel-verse' : 'font-sans'}
                    `}>
                        <div className="flex items-center gap-2">
                            {isPixel ? (
                                // Pixel 风格：复古字符画按钮
                                <div className="flex gap-2 text-[10px] opacity-50 font-bold tracking-widest">
                                    <span className="cursor-pointer hover:text-red-500">[x]</span>
                                    <span className="cursor-pointer hover:text-yellow-500">[-]</span>
                                    <span className="cursor-pointer hover:text-green-500">[ ]</span>
                                </div>
                            ) : (
                                // Modern 风格：macOS 交通灯圆点
                                <div className="flex gap-1.5 group-hover:opacity-100 opacity-60 transition-opacity">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                                </div>
                            )}
                            <span className="uppercase font-bold ml-2 opacity-70 text-xs">{lang || 'TEXT'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CopyButton content={code} />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={lang}
                            PreTag="div"
                            customStyle={{
                                margin: 0,
                                borderRadius: 0,
                                fontFamily: isPixel ? '"VT323", monospace' : '"Menlo", monospace',
                                fontSize: '14px',
                                lineHeight: '1.4',
                                background: '#1e1e1e'
                            }}
                        >
                            {code}
                        </SyntaxHighlighter>
                    </div>
                </div>
            );
            codeBlockCache.current.set(cacheKey, result);
            // Limit cache size to prevent memory issues
            if (codeBlockCache.current.size > 100) {
                const firstKey = codeBlockCache.current.keys().next().value;
                if (firstKey) {
                    codeBlockCache.current.delete(firstKey);
                }
            }
        }
        return codeBlockCache.current.get(cacheKey)!;
    };

    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath as any]}
            rehypePlugins={[rehypeKatex, rehypeRaw as any]}
            components={{
                style: () => null,
                script: () => null,
                link: () => null,
                meta: () => null,
                head: () => null,
                iframe: () => null, 
                object: () => null,
                embed: () => null,
                form: () => null,
                html: ({ children }: { children?: React.ReactNode }) => <>{children}</>, 
                body: ({ children }: { children?: React.ReactNode }) => <>{children}</>,

                // Table styling
                table: ({children}: any) => (
                    <div className="overflow-x-auto my-4 rounded-lg border border-white/10">
                        <table className="min-w-full text-left text-sm whitespace-nowrap">
                            {children}
                        </table>
                    </div>
                ),
                thead: ({children}: any) => (
                    <thead className="bg-black/10 font-bold uppercase tracking-wider border-b border-white/10">
                        {children}
                    </thead>
                ),
                tbody: ({children}: any) => <tbody className="divide-y divide-white/5">{children}</tbody>,
                tr: ({children}: any) => (
                    <tr className="hover:bg-white/5 transition-colors last:border-0">
                        {children}
                    </tr>
                ),
                td: ({children}: any) => <td className="px-4 py-2">{children}</td>,
                th: ({children}: any) => <th className="px-4 py-2 text-xs opacity-70">{children}</th>,

                // Ensure Paragraphs Wrap
                p: ({children}: any) => (
                    <p className={`mb-4 last:mb-0 leading-7 ${isPixel ? '' : 'tracking-wide text-[0.95rem]'}`}>
                        {children}
                    </p>
                ),

                // List styling with improved marker colors
                ul: ({children}: any) => (
                    <ul className="pl-6 space-y-1 list-disc marker:text-gray-400 mb-4">{children}</ul>
                ),
                ol: ({children}: any) => (
                    <ol className="pl-6 space-y-1 list-decimal marker:text-gray-400 mb-4">{children}</ol>
                ),
                li: ({children}: any) => (
                    <li className="break-words pl-1 my-1 leading-7 relative">
                        {children}
                    </li>
                ),

                // Heading styling
                h1: ({children}: any) => (
                    <h1 className="text-xl font-bold mb-4 mt-6 pb-2 border-b border-white/10">{children}</h1>
                ),
                h2: ({children}: any) => (
                    <h2 className="text-lg font-bold mb-3 mt-5">{children}</h2>
                ),
                h3: ({children}: any) => <h3 className="text-base sm:text-lg font-bold mb-2 mt-4">{children}</h3>,

                // Blockquote styling
                blockquote: ({children}: any) => (
                    <blockquote className={`
                        border-l-4 pl-4 py-1 my-4 italic opacity-80 bg-white/5 rounded-r
                        ${isPixel ? 'border-current' : 'border-blue-500'}
                    `}>
                        {children}
                    </blockquote>
                ),
                
                video: ({node, src, ...props}: any) => (
                     <MediaFrame theme={theme} label="Video Feed" icon={<Play size={14} />}>
                        <video controls className="w-full max-h-[400px]" src={src as string} {...props} />
                     </MediaFrame>
                ),
                audio: ({node, src, ...props}: any) => (
                    <MediaFrame theme={theme} label="Audio Log" icon={<Play size={14} />}>
                        <audio controls className="w-full" src={src as string} {...props} />
                    </MediaFrame>
                ),
                a: ({node, href, children, ...props}: any) => {
                    const url = (typeof href === 'string' ? href : undefined) || '';
                    const type = getMediaType(url);
                    
                    if (type === 'video') return <MediaFrame theme={theme} label="Video Feed" icon={<Play size={14} />}><video controls className="w-full max-h-[400px]" src={url} /></MediaFrame>;
                    if (type === 'audio') return <MediaFrame theme={theme} label="Audio Log" icon={<Play size={14} />}><audio controls className="w-full" src={url} /></MediaFrame>;
                    if (type === 'model') {
                        const ModelViewerComponent = 'model-viewer' as any;
                        return (
                            <MediaFrame theme={theme} label="3D Asset" icon={<Box size={14} />}>
                                <ModelViewerComponent src={url} camera-controls auto-rotate shadow-intensity="1" style={{ width: '100%', height: '300px' }} />
                            </MediaFrame>
                        );
                    }
                    if (type === 'html') return <MediaFrame theme={theme} label="WEB PREVIEW" icon={<Globe size={14} />}><iframe src={url} className="w-full h-[400px] border-none bg-white" sandbox="allow-scripts" title="Web Preview"/></MediaFrame>;
                    
                    // Render Image if detected as an image link
                    if (type === 'image') {
                        return (
                            <div className={`my-2 inline-block relative group rounded overflow-hidden border border-white/10`} title={url}>
                                <img src={url} alt="Preview" className={`max-w-full h-auto max-h-[500px] object-contain ${styles.shadow}`} loading="lazy" />
                                <a href={url} target="_blank" rel="noopener noreferrer" className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Maximize size={12} />
                                </a>
                            </div>
                        );
                    }

                    return <a href={href as string} className="text-blue-500 hover:text-blue-400 underline break-all" target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
                },
                img: ({node, src, alt, ...props}: any) => {
                    return (
                        <div className={`my-2 inline-block relative group rounded overflow-hidden`}>
                            <img src={src as string} alt={alt} className={`max-w-full h-auto ${styles.shadow}`} loading="lazy" {...props} />
                            {alt && <div className="absolute bottom-0 left-0 bg-black/70 text-white text-[10px] px-1 py-0.5 max-w-full truncate">{alt}</div>}
                        </div>
                    );
                },
                code: ({node, inline, className, children, ...props}: any) => {
                    const match = /language-(\w+)/.exec(className || '');
                    const lang = match ? match[1] : '';
                    const isMermaid = lang === 'mermaid';

                    if (!inline && isMermaid) {
                        return <MermaidBlock code={String(children).replace(/\n$/, '')} theme={theme} />;
                    }

                    if (!inline && lang === 'html') {
                        return <HtmlPreviewBlock code={String(children).replace(/\n$/, '')} theme={theme} />;
                    }

                    if (!inline && match) {
                        return getCachedCodeBlock(String(children).replace(/\n$/, ''), lang);
                    }

                    // Inline code with enhanced contrast
                    if (inline) {
                        return (
                            <code className={`
                                px-1.5 py-0.5 rounded text-[0.85em] font-mono mx-1
                                ${isPixel 
                                    ? 'bg-black/20 text-current' 
                                    : 'bg-primary/10 border border-white/10 text-accent'}
                            `} {...props}>
                                {children}
                            </code>
                        );
                    }
                }
            } as any}
        >
            {processedText}
        </ReactMarkdown>
    );
});

const ThinkingBlock: React.FC<{ content: string; theme: Theme; language: Language; isStreaming?: boolean }> = React.memo(({ content, theme, language, isStreaming = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const t = TRANSLATIONS[language];
    const styles = THEME_STYLES[theme];
    const isPixel = styles.type === 'pixel';
    const borderColor = styles.borderColor || 'border-gray-300';

    return (
        <div className={`
            my-2 overflow-hidden transition-all duration-300 ease-in-out
            ${styles.radius}
            ${isStreaming ? 'animate-pulse border border-purple-500/30' : ''}
            ${isOpen ? 'bg-black/5 dark:bg-white/5' : 'bg-transparent'}
        `}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center gap-2 px-3 py-2 text-xs font-medium uppercase tracking-wider w-full text-left
                    rounded-lg transition-colors my-1
                    ${isOpen ? 'bg-white/10 text-purple-300' : 'text-gray-500 hover:bg-white/5'}
                `}
            >
                <Brain size={12} className={isOpen ? "text-purple-400" : "opacity-50"} />
                <span className="flex-1 opacity-80">
                    {t.thinkingProcess}
                </span>
                <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={12} />
                </div>
            </button>

            <div className={`
                transition-all duration-300 ease-in-out overflow-hidden
                ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
            `}>
                <div className={`
                    px-4 pb-4 pt-0 text-sm opacity-80 border-l-2 ml-3.5
                    ${borderColor} border-opacity-30
                    font-mono leading-relaxed text-gray-500 dark:text-gray-400
                `}>
                    <MarkdownRenderer text={content} theme={theme} />
                </div>
            </div>
        </div>
    );
});

const ToolDetails: React.FC<{ content: string; theme: Theme; language: Language; index: number }> = React.memo(({ content, theme, language, index }) => {
    const styles = THEME_STYLES[theme];
    
    // ... (parsing logic same as before) ...
     const { params, error } = useMemo(() => {
        try {
            let safeContent = content;
            if (!content.includes('</tool_action>')) safeContent += '</tool_action>';
            const parser = new DOMParser();
            const doc = parser.parseFromString(safeContent, "text/xml");
            if (doc.querySelector("parsererror")) return { params: [], error: 'Parsing Error' };

            const root = doc.querySelector("tool_action");
            if (!root) return { params: [], error: 'Invalid XML' };

            const extractedParams: { key: string, attrs: Record<string,string>, value: string }[] = [];
            Array.from(root.children).forEach(child => {
                const attrs: Record<string, string> = {};
                Array.from(child.attributes).forEach(attr => attrs[attr.name] = attr.value);
                extractedParams.push({ key: child.tagName, attrs, value: child.textContent || '' });
            });

            return { params: extractedParams, error: null };
        } catch (e) {
            return { params: [], error: String(e) };
        }
    }, [content]);

    return (
        <div className={`p-2 border-l-2 ${styles.borderColor} ml-1 border-opacity-30`}>
            <div className="text-[10px] uppercase font-bold opacity-50 mb-1">Call #{index + 1}</div>
            <div className="space-y-2 overflow-x-auto">
                {error ? <div className="text-red-500 text-xs">{error}</div> : 
                params.length === 0 ? <span className="opacity-50 italic text-xs">No parameters</span> : 
                params.map((p, idx) => (
                    <div key={idx} className="flex flex-col gap-1 text-xs">
                         <div className="flex items-center gap-2">
                             <span className="font-bold text-blue-500">{p.key}</span>
                             {Object.entries(p.attrs).map(([k, v]) => (
                                  <span key={k} className="opacity-70">
                                      <span className="text-purple-500">{k}</span>=
                                      <span className="text-green-600">"{String(v)}"</span>
                                  </span>
                             ))}
                         </div>
                         {p.value && (
                             <div className={`pl-4 border-l ${styles.borderColor} border-opacity-20`}>
                                 {p.value}
                             </div>
                         )}
                    </div>
                ))}
            </div>
        </div>
    );
});

const ToolActionBlock: React.FC<{ 
    name: string; 
    count: number; 
    rawContents: string[]; 
    theme: Theme; 
    language?: Language;
    state: 'running' | 'completed';
}> = React.memo(({ name, count, rawContents, theme, language = 'en', state }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const styles = THEME_STYLES[theme];

    const { label, isRunning } = useMemo(() => {
        const isRunning = state === 'running';
        let label = '';
        if (language === 'zh') label = isRunning ? '运行中...' : '已执行';
        else if (language === 'ja') label = isRunning ? '実行中...' : '完了';
        else label = isRunning ? 'Running...' : 'Executed';
        return { label, isRunning };
    }, [state, language]);

    return (
        <div className={`
            my-1 border-l-2 font-mono text-xs overflow-hidden transition-all duration-200 ${styles.radius}
            ${styles.secondary} bg-opacity-20 ${styles.borderColor} border-opacity-50
        `}>
           <div 
             onClick={() => setIsExpanded(!isExpanded)}
             className="flex items-center justify-between px-2 py-1.5 cursor-pointer select-none"
           >
              <div className="flex items-center gap-2 opacity-80">
                 <div className="relative w-3 h-3 flex items-center justify-center">
                    {isRunning ? (
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                    ) : (
                        <Terminal size={12} className={styles.text} />
                    )}
                 </div>
                 
                 <div className="flex items-baseline gap-2">
                    <span className="font-bold opacity-70">
                        {name}
                    </span>
                    <span className={`text-[10px] ${isRunning ? 'text-blue-500' : 'opacity-40'}`}>
                       {isRunning ? '...' : ''}
                    </span>
                 </div>
              </div>

              <div className="flex items-center gap-2 opacity-50">
                 {count > 1 && (
                     <span className="text-[10px] font-bold">x{count}</span>
                 )}
                 {isExpanded ? <ChevronDown size={12}/> : <ChevronRight size={12}/>}
              </div>
           </div>

           {isExpanded && (
               <div className={`p-2 space-y-2 border-t border-dashed ${styles.borderColor} border-opacity-30`}>
                   {rawContents.map((content, idx) => (
                       <ToolDetails key={idx} content={content} index={idx} theme={theme} language={language} />
                   ))}
               </div>
           )}
        </div>
    );
});

// ... (parseMessageContent remains the same) ...
const parseMessageContent = (content: string, theme: Theme, language: Language, isStreamingMessage: boolean, isLastMessage: boolean) => {
    const regex = /(<thinking>[\s\S]*?(?:<\/thinking>|$)|<tool_action[\s\S]*?(?:<\/tool_action>|$))/gi;
    const parts = content.split(regex);
    const renderedNodes: React.ReactNode[] = [];
    let pendingTools: string[] = [];
    let currentToolName = '';

    const flushTools = (isFinal: boolean) => {
        if (pendingTools.length > 0) {
            const state = (isFinal && isStreamingMessage) ? 'running' : 'completed';
            renderedNodes.push(
                <ToolActionBlock 
                    key={`tool-group-${renderedNodes.length}`} 
                    name={currentToolName} 
                    count={pendingTools.length} 
                    rawContents={[...pendingTools]} 
                    theme={theme} 
                    language={language}
                    state={state}
                />
            );
            pendingTools = [];
            currentToolName = '';
        }
    };

    parts.forEach((part, index) => {
        if (!part.trim()) return;
        if (part.startsWith('<tool_action')) {
            const match = part.match(/name=['"]([^'"]+)['"]/);
            const name = match ? match[1] : 'Unknown';
            if (currentToolName && name !== currentToolName) flushTools(false);
            currentToolName = name;
            pendingTools.push(part);
        } else {
            flushTools(false);
            if (part.startsWith('<thinking')) {
                const inner = part.replace(/^<thinking>/i, '').replace(/<\/thinking>$/i, '');
                renderedNodes.push(<ThinkingBlock key={`think-${index}`} content={inner} theme={theme} language={language} isStreaming={isStreamingMessage && isLastMessage} />);
            } else {
                renderedNodes.push(
                    <div key={`md-${index}`} className="markdown-body break-words w-full overflow-x-auto">
                        <MarkdownRenderer text={part} theme={theme} />
                    </div>
                );
            }
        }
    });
    flushTools(true);
    return renderedNodes;
};

interface MessageBubbleProps {
    msg: Message;
    theme: Theme;
    language: Language;
    isStreaming: boolean;
    isLast: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = React.memo(({ msg, theme, language, isStreaming, isLast }) => {
    const styles = THEME_STYLES[theme];
    const isModern = styles.type === 'modern';
    const isPixel = styles.type === 'pixel';
    const isAssistant = msg.role === 'assistant';

    // Bubble shape and color logic - Assistant now has transparent background
    const bubbleShape = msg.role === 'user'
        ? (isModern ? 'rounded-2xl rounded-tr-sm' : '')
        : (isModern ? 'rounded-2xl rounded-tl-sm' : '');

    const bubbleColor = msg.role === 'user'
        ? `${styles.primary} ${styles.primaryText}`
        : 'bg-transparent pl-0';

    // Width calculation
    const isWide = msg.role !== 'user' && (msg.content?.includes('<thinking>') || msg.content?.includes('<tool_action') || /^\s*<!DOCTYPE html>/i.test(msg.content.trim()) || /^\s*<html/i.test(msg.content.trim()));

    const bubbleContainerClass = isAssistant
        ? 'max-w-[95%] md:max-w-[85%] lg:max-w-[80%]' // AI: 限制宽度，右侧留白
        : 'max-w-[90%] md:max-w-[85%] ml-auto';       // User: 保持原样

    return (
        <div className={`flex gap-4 mb-6 ${isAssistant ? 'justify-start' : 'justify-end'} group animate-msg-in`}>
            {/* Assistant Avatar (Left) */}
            {isAssistant && (
                <div className={`
                    w-8 h-8 shrink-0 flex items-center justify-center rounded-sm overflow-hidden mt-1
                    ${isPixel ? 'border-2 border-current' : 'rounded-full bg-gradient-to-tr from-blue-500 to-purple-500'}
                `}>
                    <div className="text-xs font-bold text-white">AI</div>
                </div>
            )}

            <div className={bubbleContainerClass}>
                <div
                    className={`
                        ${styles.radius} ${bubbleShape}
                        ${isWide ? 'max-w-[95vw] md:max-w-[90%]' : 'max-w-full inline-block text-left'}
                        ${bubbleColor}
                        overflow-hidden min-w-0 message-bubble
                        ${isAssistant ? '' : `${styles.borderWidth} ${styles.borderColor} ${styles.shadow} p-4`}
                    `}
                >
                    {/* Assistant header with name and actions */}
                    {isAssistant && (
                        <div className="flex items-center gap-2 mb-1 opacity-50 text-xs font-bold uppercase select-none">
                            <span>Assistant</span>
                            <div className="group-hover:opacity-100 opacity-0 transition-opacity flex gap-2">
                                <CopyButton content={msg.content || ''} />
                            </div>
                        </div>
                    )}

                    {/* Display Images for User Messages */}
                    {msg.role === 'user' && msg.images && msg.images.length > 0 && (
                        <div className="flex flex-col gap-2 mb-2">
                            {msg.images.map((img, idx) => (
                                <div key={idx} className={`relative rounded overflow-hidden border-2 border-white/20 max-w-full`}>
                                    <img src={img.startsWith('data:') ? img : `data:image/png;base64,${img}`} alt="Uploaded" className="max-w-full h-auto max-h-[500px] object-contain" />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className={`leading-relaxed text-sm ${styles.font} break-words min-w-0`}>
                        {msg.role === 'user' ? (
                            <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                        ) : (
                            msg.content ? (
                                /^\s*<!DOCTYPE html>/i.test(msg.content.trim()) || /^\s*<html/i.test(msg.content.trim()) ? (
                                    <HtmlPreviewBlock code={msg.content} theme={theme} defaultPreview={true} />
                                ) : (
                                    parseMessageContent(msg.content, theme, language, isStreaming && isLast, isLast)
                                )
                            ) : isStreaming && isLast ? (
                                // Streaming skeleton placeholder to prevent layout shift
                                <div className="space-y-2 py-1">
                                    <div className="flex gap-1 items-center animate-pulse">
                                        <div className="h-3 bg-gray-400/30 rounded w-3"></div>
                                        <div className="h-3 bg-gray-400/30 rounded w-20"></div>
                                    </div>
                                    <div className="h-3 bg-gray-400/20 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-400/20 rounded w-1/2"></div>
                                    <div className="h-3 bg-gray-400/10 rounded w-5/6"></div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 py-2 opacity-70">
                                    <Loader2 size={16} className="animate-spin" />
                                    <span className="animate-pulse">Thinking...</span>
                                </div>
                            )
                        )}
                        {isStreaming && isLast && msg.content && (
                            <span className="typing-cursor inline-block w-0.5 h-4 bg-current ml-1 align-middle"></span>
                        )}
                    </div>
                </div>
            </div>

            {/* User Avatar (Right) */}
            {!isAssistant && (
                <div className={`
                    w-8 h-8 shrink-0 flex items-center justify-center mt-1
                    ${isPixel ? 'border-2 border-current bg-white text-black' : 'rounded-full bg-gray-200 text-gray-600'}
                `}>
                    <div className="text-xs font-bold">ME</div>
                </div>
            )}
        </div>
    );
});

export const Chat: React.FC<ChatProps> = ({ 
  theme, language, messages, activeModel, provider,
  onSendMessage, onUpdateMessage, onTriggerRainbow,
  setTheme, setLanguage, isMoonlightUnlocked, searchQuery = '', onStop,
  isStreaming: externalIsStreaming = false
}) => {
  const [input, setInput] = useState('');
  const [localIsStreaming, setLocalIsStreaming] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  // Image Upload State
  const [pendingImages, setPendingImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const isStreaming = externalIsStreaming || localIsStreaming;
  const scrollRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true); 

  const styles = THEME_STYLES[theme];
  const t = TRANSLATIONS[language];
  const isMultimodal = activeModel?.type === 'multimodal';

  const displayMessages = useMemo(() => {
    if (!searchQuery.trim()) return messages;
    return messages.filter(msg => 
        msg.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
        msg.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [messages, searchQuery]);

  // Scroll handler: detect user scroll position to control auto-scroll behavior
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    const isAtBottom = distanceFromBottom <= 50;
    shouldAutoScrollRef.current = isAtBottom;
    
    // Show scroll to bottom button when user scrolls away from bottom
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;
    setShowScrollButton(distanceToBottom > 300);
  }, []);

  useLayoutEffect(() => {
    if (scrollRef.current && shouldAutoScrollRef.current && !searchQuery) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, searchQuery, isStreaming]);

  // Image Handling Functions
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
          processFiles(Array.from(e.target.files));
          // Reset input so same file can be selected again if needed
          e.target.value = '';
      }
  };

  const processFiles = (files: File[]) => {
      if (!isMultimodal) return;
      files.forEach(file => {
          if (!file.type.startsWith('image/')) return;
          const reader = new FileReader();
          reader.onload = (e) => {
              if (e.target?.result && typeof e.target.result === 'string') {
                  setPendingImages(prev => [...prev, e.target!.result as string]);
              }
          };
          reader.readAsDataURL(file);
      });
  };

  const handlePaste = (e: React.ClipboardEvent) => {
      if (!isMultimodal) return;
      const items = e.clipboardData.items;
      const files: File[] = [];
      for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
              const file = items[i].getAsFile();
              if (file) files.push(file);
          }
      }
      if (files.length > 0) {
          e.preventDefault();
          processFiles(files);
      }
  };

  const removePendingImage = (index: number) => {
      setPendingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = async () => {
    if (input.trim() === '/upup downdown left right') {
        onTriggerRainbow();
        setInput('');
        return;
    }
    
    // Allow sending if there's text OR images
    if ((!input.trim() && pendingImages.length === 0) || !activeModel || !provider || isStreaming) return;
    
    shouldAutoScrollRef.current = true;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
      images: pendingImages.length > 0 ? [...pendingImages] : undefined
    };
    onSendMessage(userMsg, { deepThinkingEnabled: true });
    setInput('');
    setPendingImages([]);
    setLocalIsStreaming(true);
  };

  useEffect(() => {
    if (!externalIsStreaming && localIsStreaming) {
       setLocalIsStreaming(false);
    }
  }, [externalIsStreaming]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isDisabled = (!activeModel) && input.trim() !== '/upup downdown left right';
  const isButtonDisabled = isDisabled && pendingImages.length === 0 && !isStreaming;

  return (
    <div className={`flex flex-col h-full relative z-10 ${styles.font}`}>
      
      <div 
        className="flex-1 overflow-y-auto overflow-x-auto p-3 sm:p-4 space-y-4 sm:space-y-6 relative z-10 pb-48 sm:pb-56" 
        ref={scrollRef}
        onScroll={handleScroll}
      >
                 {messages.length === 0 ? (
           <div className={`flex flex-col items-center justify-center h-full select-none ${styles.text}`}>
              <div className="text-6xl mb-6 p-4 rounded-3xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20 animate-msg-in">
                🎮
              </div>
              <h2 className="text-2xl font-bold mb-2 animate-msg-in" style={{ animationDelay: '0.1s' }}>
                有什么可以帮你的吗？
              </h2>
              <SuggestionGrid 
                onSelect={(text: string) => setInput(text)} 
                theme={theme} 
              />
           </div>
        ) : displayMessages.length === 0 ? (
           <div className={`flex flex-col items-center justify-center h-full opacity-50 select-none ${styles.text}`}>
              <div className="text-4xl mb-4">🔍</div>
              <div className="text-xl">{t.noMessagesFound}</div>
           </div>
        ) : (
           displayMessages.map((msg, index) => (
             <MessageBubble 
                 key={msg.id}
                 msg={msg}
                 theme={theme}
                 language={language}
                 isStreaming={isStreaming}
                 isLast={index === messages.length - 1}
             />
           ))
        )}
       </div>

      {/* Scroll to Bottom Button */}
      {showScrollButton && (
          <div className="absolute bottom-32 right-6 z-40 animate-bounce">
              <button 
                  onClick={() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })}
                  className={`p-3 rounded-full shadow-lg transition-all ${styles.primary} ${styles.primaryText} hover:scale-110`}
              >
                  <ChevronDown size={20} />
              </button>
          </div>
      )}

      {/* Floating Input Area - Positioned at bottom of chat panel */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-50 pointer-events-none flex justify-center items-end mb-0 sm:mb-12">
        <div className={`
            w-full max-w-3xl pointer-events-auto rounded-3xl
            transition-all duration-300 ease-out
            ${styles.type === 'modern' 
              ? 'bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-white/20 shadow-2xl' 
              : styles.type === 'cyber'
                ? 'bg-[#0A0A20]/90 backdrop-blur-lg border border-[#00FFE1]/30 shadow-[0_0_20px_rgba(0,255,225,0.3)]'
                : styles.type === 'glass'
                  ? 'bg-[#252528]/70 backdrop-blur-xl border border-white/10 shadow-xl'
                  : `shadow-[8px_8px_0px_rgba(0,0,0,0.5)] ${styles.inputBg}`
            }
        `}>
          {/* Pending Images Preview */}
          {pendingImages.length > 0 && (
              <div className="flex gap-2 mb-2 overflow-x-auto pb-2 px-1">
                  {pendingImages.map((img, idx) => (
                      <div key={idx} className={`relative shrink-0 w-16 h-16 ${styles.borderWidth} ${styles.borderColor} ${styles.radius} overflow-hidden group`}>
                          <img src={img} className="w-full h-full object-cover" alt="Preview" />
                          <button 
                              onClick={() => removePendingImage(idx)}
                              className={`absolute top-0 right-0 bg-red-500 text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity ${styles.radius}`}
                          >
                              <X size={12} />
                          </button>
                      </div>
                  ))}
              </div>
          )}

          {/* Input Container: Floating Card Effect */}
          <div className={`
            relative rounded-3xl overflow-hidden transition-shadow duration-200
            ${styles.type === 'modern' ? 'shadow-lg border border-white/10 focus-within:ring-1 focus-within:ring-white/20' : styles.borderWidth + ' ' + styles.borderColor}
          `}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              placeholder={activeModel ? `Message ${activeModel.name}... ${isMultimodal ? '(Paste images supported)' : ''}` : "Select a model from the sidebar to start..."}
              disabled={isDisabled && !input.startsWith('/')}
              className={`
                w-full p-4 pr-14 min-h-[56px] max-h-[200px] resize-none outline-none
                bg-transparent ${styles.text} placeholder-opacity-40
              `}
              style={{ height: 'auto', minHeight: '56px' }}
            />
            
            {/* Action Buttons */}
            <div className="absolute bottom-2 right-2 flex gap-2">
              {/* Upload Button */}
              {isMultimodal && (
                  <>
                      <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleFileSelect} 
                          accept="image/*" 
                          multiple 
                          className="hidden" 
                      />
                      <button 
                          onClick={() => fileInputRef.current?.click()}
                          className={`p-2 rounded-full hover:bg-black/5 transition-colors ${styles.textMuted}`}
                          title={t.uploadImage}
                      >
                          <Paperclip size={18} />
                      </button>
                  </>
              )}

              <button 
                  onClick={isStreaming ? onStop : handleSend} 
                  disabled={isButtonDisabled}
                  className={`
                    p-2 rounded-full transition-all duration-200
                    ${isButtonDisabled ? 'opacity-30 cursor-not-allowed bg-gray-500' : 'opacity-100 hover:scale-105'}
                    ${isStreaming ? 'bg-red-500 text-white' : (styles.type === 'modern' ? 'bg-white text-black' : styles.primary + ' ' + styles.primaryText)}
                  `}
              >
                  {isStreaming ? <Square size={16} fill="currentColor" /> : <Send size={18} />}
              </button>
            </div>
            
            {/* Streaming Indicator - Compact */}
            {isStreaming && (
              <div className={`absolute -top-8 right-2 flex items-center ${styles.text}`}>
                <span className="animate-spin mr-1.5 text-xs">★</span> 
                <span className="text-xs opacity-80">{t.generating}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
