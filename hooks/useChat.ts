import { useState, useEffect, useCallback, useRef } from 'react';
import { Message } from '../types';

interface UseChatOptions {
  onSend?: (message: Message) => void;
  maxMessages?: number;
}

export const useChat = (options: UseChatOptions = {}) => {
  const { onSend, maxMessages = 100 } = options;
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback((content: string, role: 'user' | 'assistant' = 'user') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: Date.now()
    };
    
    setMessages(prev => {
      const updated = [...prev, newMessage];
      return updated.slice(-maxMessages);
    });
    
    onSend?.(newMessage);
    return newMessage;
  }, [onSend, maxMessages]);

  const updateMessage = useCallback((id: string, content: string) => {
    setMessages(prev =>
      prev.map(msg => msg.id === id ? { ...msg, content } : msg)
    );
  }, []);

  const deleteMessage = useCallback((id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  return {
    messages,
    setMessages,
    isStreaming,
    setIsStreaming,
    sendMessage,
    updateMessage,
    deleteMessage,
    clearMessages,
    stopGeneration,
    abortControllerRef
  };
};

export const useAutoScroll = (deps: unknown[]) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldAutoScroll = useRef(true);

  useEffect(() => {
    if (shouldAutoScroll.current && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, deps);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const distanceToBottom = scrollHeight - scrollTop - clientHeight;
      shouldAutoScroll.current = distanceToBottom < 100;
    }
  }, []);

  return { containerRef, handleScroll, shouldAutoScroll };
};
