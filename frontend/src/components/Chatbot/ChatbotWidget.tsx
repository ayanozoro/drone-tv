import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatMessage as ChatMessageType } from '../../types';
import { ChatMessage } from './ChatMessage';
import { SuggestedPrompts } from './SuggestedPrompts';
import { processUserMessage } from '../../services/chatbotEngine';
import { CHATBOT_SUGGESTIONS } from '../../data/chatbotIntents';
import {
  Bot,
  X,
  Send,
  RotateCcw,
} from 'lucide-react';

interface ChatbotWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
}

const INITIAL_BOT_MESSAGE: ChatMessageType = {
  id: 'welcome-msg',
  sender: 'bot',
  text:
    '👋 Hello! I am the **DroneTV AI Support Assistant**.\n\n' +
    'How can I help you today? You can ask me about our enterprise drone services, DGCA certification courses, registration, or schedule a callback.',
  timestamp: new Date(),
  suggestions: CHATBOT_SUGGESTIONS.slice(0, 5),
};

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([INITIAL_BOT_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
      }, 150);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate natural brief thinking time for realistic interaction
    setTimeout(() => {
      const result = processUserMessage(query);

      const botMessage: ChatMessageType = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: result.response,
        timestamp: new Date(),
        ctaText: result.ctaText,
        ctaAction: result.ctaAction,
        ctaPayload: result.ctaPayload,
        suggestions: result.suggestions,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    if (window.confirm('Are you sure you want to reset the conversation?')) {
      setMessages([
        {
          ...INITIAL_BOT_MESSAGE,
          id: `welcome-${Date.now()}`,
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleTriggerCta = (action?: string, payload?: string) => {
    if (action === 'enquiry') {
      const url = payload ? `/enquire?interest=${encodeURIComponent(payload)}` : '/enquire';
      navigate(url);
      if (window.innerWidth < 640) {
        onToggle(); // Close on mobile to view form
      }
    } else if (action === 'courses') {
      navigate('/courses');
      if (window.innerWidth < 640) onToggle();
    } else if (action === 'services') {
      navigate('/services');
      if (window.innerWidth < 640) onToggle();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Toggle Button (When Closed) */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="relative flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-2xl shadow-cyan-500/40 hover:from-cyan-400 hover:to-blue-500 hover:scale-105 transition-all group"
          aria-label="Open DroneTV Assistant"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse"></span>
          </div>
          <span className="text-sm tracking-wide hidden sm:inline-block">AI Assistant</span>

          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-slate-900">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Chat Window (When Open) */}
      {isOpen && (
        <div className="w-[94vw] sm:w-[400px] h-[580px] max-h-[85vh] glass-card rounded-2xl border border-cyan-500/40 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-4 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white">DroneTV Assistant</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <p className="text-[10px] text-cyan-400 font-medium">Rule-Based Instant Support</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Reset Conversation"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={onToggle}
                title="Close Assistant"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#070C18]/80">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                onSelectSuggestion={(sugg) => handleSendMessage(sugg)}
                onTriggerCta={handleTriggerCta}
              />
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
                <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400">
                  <Bot className="w-4 h-4 animate-bounce" />
                </div>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-150"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-300"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts Shelf */}
          <SuggestedPrompts
            prompts={CHATBOT_SUGGESTIONS}
            onSelectPrompt={(prompt) => handleSendMessage(prompt)}
          />

          {/* Text Input Footer */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about courses, services, contact..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
