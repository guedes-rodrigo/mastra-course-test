// src/run-workflow.ts
import { contentWorkflow } from "./mastra/workflows/content-workflow";

async function runContentWorkflow() {
  console.log("🚀 Executando workflow programaticamente...\n");

  try {
    // Usamos diretamente o workflow importado
    const workflow = contentWorkflow;

    // Cria uma instância de execução
    const run = await workflow.createRunAsync();

    // Executa com dados de teste
    const result = await run.start({
      inputData: {
        content:
          "A mudança climática é um dos desafios mais urgentes do nosso tempo, exigindo ação imediata de governos, empresas e indivíduos em todo o mundo.",
        type: "blog",
      },
    });

    if (result.status === "success") {
      console.log("✅ Sucesso!");
      console.log(
        "📊 Tempo de leitura:",
        result.result.metadata.readingTime,
        "minutos",
      );
      console.log("🎯 Dificuldade:", result.result.metadata.difficulty);
      console.log("📅 Processado em:", result.result.metadata.processedAt);
    }
  } catch (error) {
    console.error("❌ Erro:", (error as Error).message);
  }
}

// Executa o workflow
runContentWorkflow();
