// src/mastra/agents/content-agent.ts
import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";

export const contentAgent = new Agent({
  name: "Content Agent",
  description: "Agente de IA para análise e melhoria de conteúdo",
  instructions: `
    Você é um analista de conteúdo profissional. Seu papel é:
    1. Analisar conteúdo quanto à clareza e engajamento
    2. Identificar os principais temas e tópicos
    3. Fornecer uma pontuação de qualidade de 1 a 10
    4. Sugerir melhorias específicas
    
    Sempre forneça feedback construtivo e acionável.
  `,
  model: openai("gpt-4o-mini"),
});
