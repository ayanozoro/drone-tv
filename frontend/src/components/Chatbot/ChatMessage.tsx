import React from 'react';
import { ChatMessage as ChatMessageType } from '../../types';
import { Bot, User, ArrowRight } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
  onSelectSuggestion?: (suggestion: string) => void;
  onTriggerCta?: (action?: string, payload?: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onSelectSuggestion,
  onTriggerCta,
}) => {
  const isBot = message.sender === 'bot';

  const formatTimestamp = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Basic formatted text renderer to parse bold **text** and bullet lines
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIndex) => {
      // Parse bold tags **bold**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const renderedParts = parts.map((part, partIndex) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={partIndex} className="font-bold text-cyan-300">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      return (
        <React.Fragment key={lineIndex}>
          {renderedParts}
          {lineIndex < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <div className={`flex gap-3 mb-4 ${isBot ? 'items-start' : 'items-start flex-row-reverse'}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md ${
          isBot
            ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-white'
            : 'bg-slate-700 text-slate-200'
        }`}
      >
        {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>

      {/* Message Bubble Container */}
      <div className={`max-w-[82%] space-y-2 ${isBot ? 'text-left' : 'text-right'}`}>
        <div
          className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-md ${
            isBot
              ? 'bg-slate-800/95 text-slate-200 border border-slate-700/80 rounded-tl-sm'
              : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-sm'
          }`}
        >
          {renderFormattedText(message.text)}

          {/* Embedded Bot Action CTA (e.g. "Submit an Enquiry") */}
          {isBot && message.ctaText && (
            <div className="mt-3 pt-2.5 border-t border-slate-700/60">
              <button
                onClick={() => onTriggerCta && onTriggerCta(message.ctaAction, message.ctaPayload)}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors shadow-sm"
              >
                <span>{message.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <p className="text-[10px] text-slate-500 px-1 font-mono">
          {formatTimestamp(message.timestamp)}
        </p>

        {/* Inline Suggestion Chips */}
        {isBot && message.suggestions && message.suggestions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {message.suggestions.map((sugg, i) => (
              <button
                key={i}
                onClick={() => onSelectSuggestion && onSelectSuggestion(sugg)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-slate-900/90 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all text-left"
              >
                {sugg}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
