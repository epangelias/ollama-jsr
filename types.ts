
interface ModelConfig {
    seed?: number,
}

export interface Options {
    API_URL: string;
    model: string;
    messages: ChatMessage[];
    stream: boolean;
    options: ModelConfig;
    keep_alive: string;
}

export interface SetOptions {
    API_URL?: string;
    model?: string;
    messages?: ChatMessage[];
    stream?: boolean;
    options?: ModelConfig;
    keep_alive?: string;
}

export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}