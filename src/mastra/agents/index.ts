import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { LibSQLStore, LibSQLVector } from "@mastra/libsql";
import { Memory } from "@mastra/memory";

// Create a memory instance with semantic recall configuration
const memory = new Memory({
  // Configure storage
  storage: new LibSQLStore({
    url: "file:../../memory.db", // relative path from the `.mastra/output` directory
  }), // Storage for message history
  vector: new LibSQLVector({
    connectionUrl: "file:../../vector.db", // relative path from the `.mastra/output` directory
  }), // Vector database for semantic search
  embedder: openai.embedding("text-embedding-3-small"), // Embedder for message embeddings
  options: {
    lastMessages: 20, // Include the last 20 messages in the context
    semanticRecall: true, // Enable semantic recall with default settings
  },
});

// Create an agent with memory
export const memoryAgent = new Agent({
  name: "MemoryAgent",
  instructions: `
    You are a helpful assistant with advanced memory capabilities.
    You can remember previous conversations and user preferences.
    When a user shares information about themselves, acknowledge it and remember it for future reference.
    If asked about something mentioned earlier in the conversation, recall it accurately.
    You can also recall relevant information from older conversations when appropriate.
  `,
  model: openai("gpt-4o-mini"), // You can use "gpt-3.5-turbo" if you prefer
  memory: memory,
});
