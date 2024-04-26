import { assert } from "jsr:@std/assert";
import Chat from "./mod.ts";

Deno.test(async function testChat() {
    const response = await Chat({ messages: [{ role: "system", content: "Tell me something in 10 words" }] });
    console.log(response);
    assert(typeof response == "string" && response.length);
});
