export interface AevoToolDefinition {
  name: string;
  description: string;
  parameters: {
    type: 'object';
    properties: Record<string, { type: string; description: string; enum?: string[] }>;
    required?: string[];
  };
}

export interface AevoToolCall {
  id: string;
  name: string;
  args: Record<string, any>;
}

export interface AevoChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  toolCalls?: AevoToolCall[];
  timestamp?: number;
}

export type AIProviderType = 'gemini' | 'openai' | 'groq' | 'fallback';

export interface AIProviderConfig {
  apiKey?: string;
  modelName: string;
  temperature?: number;
}
