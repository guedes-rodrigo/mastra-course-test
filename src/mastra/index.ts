import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";
import { PinoLogger } from "@mastra/loggers";
import { memoryAgent } from "./agents";
import { financialAgent } from "./agents/financial-agent";
import { learningAssistantAgent } from "./agents/learning-assistant";
import { weatherAgent } from "./agents/weather-agent";
import { contentWorkflow } from "./workflows/content-workflow";
import { weatherWorkflow } from "./workflows/weather-workflow";

export const mastra = new Mastra({
  workflows: { weatherWorkflow, contentWorkflow },
  agents: {
    weatherAgent,
    financialAgent,
    memoryAgent, // Comprehensive memory-enhanced agent with conversation history, semantic recall, and working memory
    learningAssistantAgent, // Specialized learning assistant with educational memory template
  },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage
    url: "file::memory:",
  }),
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
});
