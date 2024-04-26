
interface ModelConfig {
    // Enable Mirostat sampling for controlling perplexity. (default: 0, 0 = disabled, 1 = Mirostat, 2 = Mirostat 2.0)
    mirostat?: number,

    // Influences how quickly the algorithm responds to feedback from the generated text. A lower learning rate will result in slower adjustments, while a higher learning rate will make the algorithm more responsive. (Default: 0.1)
    mirostat_eta?: number,

    // Controls the balance between coherence and diversity of the output. A lower value will result in more focused and coherent text. (Default: 5.0)
    mirostat_tau?: number,

    // Sets the size of the context window used to generate the next token. (Default: 2048)
    num_ctx?: number,

    // Sets how far back for the model to look back to prevent repetition. (Default: 64, 0 = disabled, -1 = num_ctx)
    repeat_last_n?: number,

    // Sets how strongly to penalize repetitions. A higher value (e.g., 1.5) will penalize repetitions more strongly, while a lower value (e.g., 0.9) will be more lenient. (Default: 1.1)
    repeat_penalty?: number,

    // The temperature of the model. Increasing the temperature will make the model answer more creatively. (Default: 0.8)
    temperature?: number,

    // Sets the random number seed to use for generation. Setting this to a specific number will make the model generate the same text for the same prompt. (Default: 0)
    seed?: number,

    // Sets the stop sequences to use. When this pattern is encountered the LLM will stop generating text and return. Multiple stop patterns may be set by specifying multiple separate stop parameters in a modelfile.
    stop?: string,

    // Tail free sampling is used to reduce the impact of less probable tokens from the output. A higher value (e.g., 2.0) will reduce the impact more, while a value of 1.0 disables this setting. (default: 1)
    tfs_z?: number,

    // Maximum number of tokens to predict when generating text. (Default: 128, -1 = infinite generation, -2 = fill context)
    num_predict?: number,

    // Reduces the probability of generating nonsense. A higher value (e.g. 100) will give more diverse answers, while a lower value (e.g. 10) will be more conservative. (Default: 40)
    top_k?: number,

    // Works together with top-k. A higher value (e.g., 0.95) will lead to more diverse text, while a lower value (e.g., 0.5) will generate more focused and conservative text. (Default: 0.9)
    top_p?: number,
}

export interface Options {
    API_URL: string;
    model: string;
    messages: ChatMessage[];
    stream: boolean;
    options: ModelConfig;
    keep_alive: string;
    format?: "json";
}

export interface OllamaRequest {
    model: string;
    messages: ChatMessage[];
    stream?: boolean;
    options?: ModelConfig;
    keep_alive?: string;
    format?: "json";
}

export interface SetOptions {
    API_URL?: string;
    model?: string;
    messages?: ChatMessage[];
    stream?: boolean;
    options?: ModelConfig;
    keep_alive?: string;
    format?: "json",
}

export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}


export interface Model {
    name: string,
    model: string,
    modified_at: string,
    size: number,
    digest: string,
    details: {
        parent_model: string,
        format: string,
        family: string,
        families: string[],
        parameter_size: string,
        quantization_level: string
    }
}