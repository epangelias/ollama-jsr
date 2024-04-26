# @epi/ollama
Simple interface to the Ollama API

## Example
```ts
import Chat from "@epi/ollama";

const messages = [ { role: "user", content: "What is the meaning of life?" } ];

await Chat({messages});
```

## Streaming
```ts
import Chat from "@epi/ollama";

const messages = [
    {
        role: "system",
        content: "You are a helpful assistant."
    }
];

while (true) {
    const reply = await prompt(">>>");

    messages.push({ role: "user", content: reply });

    const updater = (_text: string, token: string) => {

        Deno.writeAll(Deno.stdout, new TextEncoder().encode(token));

        return true;
    }

    await Chat({ messages, model: "llama3" }, updater);

    console.log();
}
```