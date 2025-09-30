import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { LibSQLStore, LibSQLVector } from "@mastra/libsql";
import { Memory } from "@mastra/memory";

// Create a memory instance with semantic recall configuration
const memory = new Memory({
  // Configure storage
  storage: new LibSQLStore({
    url: "file:../../memory.db", // relative path from the `.mastra/output` directory
  }), // Storage for message history0ppp
  vector: new LibSQLVector({
    connectionUrl: "file:../../vector.db", // relative path from the `.mastra/output` directory
  }), // Vector database for semantic search
  embedder: openai.embedding("text-embedding-3-small"), // Embedder for message embeddings
  options: {
    lastMessages: 20, // Include the last 20 messages in the context
    semanticRecall: {
      topK: 3,
      messageRange: {
        before: 2,
        after: 1,
      },
    },
    workingMemory: {
      enabled: true,
      template: `
# User Profile

## Personal Info
- Name:
- Location:
- Timezone:
- Occupation:

## Preferences
- Communication Style:
- Topics of Interest:
- Learning Goals:

## Project Information
- Current Projects:
  - [Project 1]:
    - Deadline:
    - Status:
  - [Project 2]:
    - Deadline:
    - Status:

## Session State
- Current Topic:
- Open Questions:
- Action Items:
`,
    },
  },
});

// Create an agent with memory
export const memoryAgent = new Agent({
  name: "MemoryAgent",
  instructions: `
    You are a comprehensive assistant with advanced memory capabilities that include:
    
    1. CONVERSATION HISTORY: You remember recent messages in the conversation
    2. SEMANTIC RECALL: You can find and retrieve relevant information from past conversations
    3. WORKING MEMORY: You maintain persistent information about the user across sessions
    
    IMPORTANT MEMORY GUIDELINES:
    - Always check your working memory before asking for information the user has already provided
    - Update your working memory when you learn important information about the user
    - Use semantic recall to find relevant past conversations when appropriate
    - Provide personalized responses based on all available memory information
    
    WORKING MEMORY UPDATES:
    When the user shares information, update your working memory according to the template:
    - Personal info (name, location, occupation)
    - Preferences (communication style, interests, goals)
    - Project information (current projects, deadlines, status)
    - Session state (current topic, open questions, action items)
    
    Always acknowledge new information and confirm what you've learned about the user.
  `,
  model: openai("gpt-4o-mini"), // You can use "gpt-3.5-turbo" if you prefer
  memory: memory,
});
