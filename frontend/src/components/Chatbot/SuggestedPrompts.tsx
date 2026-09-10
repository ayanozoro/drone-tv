import React from 'react';
import { Sparkles } from 'lucide-react';

interface SuggestedPromptsProps {
  prompts: string[];
  onSelectPrompt: (prompt: string) => void;
}

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({
  prompts,
  onSelectPrompt,
}) => {
  if (!prompts || prompts.length === 0) return null;

  return (
    <div className="p-3 bg-slate-900/90 border-t border-slate-800">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 mb-2">
        <Sparkles className="w-3 h-3 text-cyan-400" />
        <span>Suggested Questions:</span>
      </div>
      <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
        {prompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPrompt(prompt)}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all text-left"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};
