import { Chat, GetModels } from "../mod.ts";
import { ChatMessage } from "../types.ts";

const messages: ChatMessage[] = [
    {
        role: "system",
        content: "You are a helpful assistant."
    }
];

const models = await GetModels();

console.log(models.map((model, i) => `[${i}] ${model.name}`).join("\n"));
const modelID = prompt("\nSelect Model:") || "0";

const model = models[+modelID] || models[0];

console.log("Using model: " + model.name + "\n");

while (true) {
    const q = await prompt(">>>");
    messages.push({ role: "user", content: q || '' });

    const updater = (_text: string, token: string) => {
        Deno.writeAll(Deno.stdout, new TextEncoder().encode(token));
        return true;
    }

    await Chat({ messages, model: model.model }, updater);

    console.log();
}