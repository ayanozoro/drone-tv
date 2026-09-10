import { CHATBOT_INTENTS, FALLBACK_RESPONSE, CHATBOT_SUGGESTIONS } from '../data/chatbotIntents';
import { ChatIntent } from '../types';

export interface BotProcessResult {
  matched: boolean;
  intentId: string;
  response: string;
  ctaText?: string;
  ctaAction?: 'enquiry' | 'courses' | 'services';
  ctaPayload?: string;
  suggestions?: string[];
}

/**
 * Clean and normalize query string for deterministic matching
 */
export const normalizeQuery = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Process a user message through the deterministic rule-based chatbot engine
 */
export const processUserMessage = (rawInput: string): BotProcessResult => {
  const normalized = normalizeQuery(rawInput);

  if (!normalized) {
    return {
      matched: false,
      intentId: 'empty',
      response: 'Please type a question or choose from the suggested options below.',
      suggestions: CHATBOT_SUGGESTIONS.slice(0, 4),
    };
  }

  // 1. Direct match or high-confidence substring matching against intent keywords
  let bestMatch: ChatIntent | null = null;
  let highestScore = 0;

  for (const intent of CHATBOT_INTENTS) {
    let score = 0;

    for (const keyword of intent.keywords) {
      const normKeyword = normalizeQuery(keyword);

      // Exact phrase match
      if (normalized === normKeyword) {
        score += 100;
        break;
      }

      // Query includes the full keyword phrase
      if (normalized.includes(normKeyword)) {
        score += 20 + normKeyword.length;
      }

      // Token overlap scoring
      const queryTokens = normalized.split(' ');
      const keywordTokens = normKeyword.split(' ');
      const matches = queryTokens.filter((token) => keywordTokens.includes(token));
      if (matches.length > 0) {
        score += matches.length * 5;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = intent;
    }
  }

  // Threshold check for reliable matching
  if (bestMatch && highestScore >= 10) {
    return {
      matched: true,
      intentId: bestMatch.id,
      response: bestMatch.response,
      ctaText: bestMatch.ctaText,
      ctaAction: bestMatch.ctaAction,
      ctaPayload: bestMatch.ctaPayload,
      suggestions: bestMatch.suggestions,
    };
  }

  // 2. Check for general high-intent lead phrases ("I want more information", "more info", "pricing")
  const leadSignals = ['more information', 'more info', 'interested', 'quote', 'cost', 'pricing', 'apply'];
  const hasLeadSignal = leadSignals.some((signal) => normalized.includes(signal));

  if (hasLeadSignal) {
    return {
      matched: true,
      intentId: 'lead_handoff',
      response:
        'I’d be delighted to assist you with that! The fastest way to get detailed pricing and answers tailored to your specific needs is to connect directly with our advisory team.',
      ctaText: 'Submit an Enquiry',
      ctaAction: 'enquiry',
      ctaPayload: 'General Information',
      suggestions: [
        'What services does DroneTV provide?',
        'What courses / training are available?',
        'How can I contact DroneTV?',
      ],
    };
  }

  // 3. Fallback response for unhandled queries
  return {
    matched: false,
    intentId: 'fallback',
    response: FALLBACK_RESPONSE,
    suggestions: CHATBOT_SUGGESTIONS.slice(0, 4),
    ctaText: 'Submit an Enquiry',
    ctaAction: 'enquiry',
  };
};
