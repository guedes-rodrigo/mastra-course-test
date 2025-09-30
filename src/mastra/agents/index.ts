import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { LibSQLStore, LibSQLVector } from "@mastra/libsql";
import { Memory } from "@mastra/memory";

// Create a memory instance with custom conversation history settings
const memory = new Memory({
  // Configure storage
  storage: new LibSQLStore({
    url: "file:../../memory.db", // Local database. Relative to the output folder
  }),
  vector: new LibSQLVector({
    connectionUrl: "file:../../vector.db", // relative path from the `.mastra/output` directory
  }),
  options: {
    lastMessages: 20, // Include the last 20 messages in the context instead of the default 10
  },
});

// Create an agent with memory
export const memoryAgent = new Agent({
  name: "MemoryAgent",
  instructions: `
    You are a helpful assistant with memory capabilities.
    You can remember previous conversations and user preferences.
    When a user shares information about themselves, acknowledge it and remember it for future reference.
    If asked about something mentioned earlier in the conversation, recall it accurately.
  `,
  model: openai("gpt-4o-mini"), // You can use "gpt-3.5-turbo" if you prefer
  memory: memory,
});
