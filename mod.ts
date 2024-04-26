import { Options, SetOptions } from "./types.ts";

const defaultOptions: Options = {
    API_URL: 'http://localhost:11434/api/chat',
    model: "llama3",
    messages: [],
    stream: true,
    options: {
        seed: Math.floor(Math.random() * 10000)
    },
    keep_alive: "2m",
}

/**
 * Access the Ollama API
 */

export default async function Chat(setOptions: SetOptions, updater?: (text: string, token: string) => boolean): Promise<string> {
    const options = { ...defaultOptions, ...setOptions };

    const data = {
        model: options.model,
        messages: options.messages,
        stream: options.stream,
        keep_alive: options.keep_alive,
        options: options.options,
    };

    const controller = new AbortController();

    const res = await fetch(options.API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        signal: controller.signal,
    });

    if (!res.ok || !res.body) throw new Error('Error in response');

    const reader = res.body.getReader();

    let text = '';

    while (true) {
        try {

            const data = await reader.read();

            const bitRes = new TextDecoder().decode(data.value);

            const json = JSON.parse(bitRes);

            if (data.done || !json || json.error) break;

            const word = json.message.content;

            text += word;

            if (updater && !updater(text, word)) {
                controller.abort();
                break;
            }

        } catch (_e) { break; }
    }

    return text;
}