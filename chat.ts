import Chat from "./mod.ts";
import { ChatMessage } from "./types.ts";

const messages: ChatMessage[] = [
    {
        role: "system",
        content: "You are a helpful assistant."
    }
];

console.log("\nDENO OLLAMA CHAT DEMO: CTRL-C to Exit\n");

while (true) {
    const q = await prompt(">>>");
    messages.push({ role: "user", content: q || '' });

    const updater = (_text: string, token: string) => {
        Deno.writeAll(Deno.stdout, new TextEncoder().encode(token));
        return true;
    }

    await Chat({ messages }, updater);

    console.log();
}