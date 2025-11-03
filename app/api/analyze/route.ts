import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import examsData from "@/data/exams.json";

interface Exam {
  codigo: string;
  mnemonico: string;
  descricao: string;
  material: string;
  setor: string;
  prazo: string;
  preco: number;
  aliases: string[];
}

const exams: Exam[] = examsData as Exam[];

export async function POST(request: NextRequest) {
  try {
    console.log("=== Iniciando análise de imagem ===");
    
    // Parse FormData
    let formData;
    try {
      formData = await request.formData();
      console.log("FormData recebido com sucesso");
    } catch (error) {
      console.error("Erro ao fazer parse do FormData:", error);
      return NextResponse.json(
        { error: "Erro ao processar o formulário", details: error instanceof Error ? error.message : "Erro desconhecido" },
        { status: 400 }
      );
    }

    const image = formData.get("image") as File | null;
    console.log("Imagem recebida:", image ? `${image.name} (${image.type}, ${image.size} bytes)` : "null");

    if (!image) {
      console.error("Nenhuma imagem foi enviada");
      return NextResponse.json(
        { error: "Nenhuma imagem foi enviada" },
        { status: 400 }
      );
    }

    // Validate image type
    if (!image.type || !image.type.startsWith("image/")) {
      console.error("Tipo de arquivo inválido:", image.type);
      return NextResponse.json(
        { error: "O arquivo enviado não é uma imagem válida" },
        { status: 400 }
      );
    }

    // Validate image size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (image.size > maxSize) {
      console.error("Imagem muito grande:", image.size);
      return NextResponse.json(
        { error: "A imagem é muito grande. Tamanho máximo: 10MB" },
        { status: 400 }
      );
    }

    // Check if API key is configured
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("API Key configurada:", apiKey ? "Sim" : "Não");
    
    if (!apiKey) {
      console.log("Usando dados mock (API Key não configurada)");
      // Return mock data for testing without API key
      const mockExams = getMockExams();
      return NextResponse.json({
        exams: mockExams,
        total: mockExams.reduce((sum, exam) => sum + exam.preco, 0),
        extractedText: "API Key não configurada - usando dados de exemplo",
      });
    }

    // Convert image to base64
    console.log("Convertendo imagem para base64...");
    let base64Image;
    try {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      base64Image = buffer.toString("base64");
      console.log("Imagem convertida com sucesso (tamanho base64:", base64Image.length, "caracteres)");
    } catch (error) {
      console.error("Erro ao converter imagem:", error);
      return NextResponse.json(
        { error: "Erro ao processar a imagem", details: error instanceof Error ? error.message : "Erro desconhecido" },
        { status: 500 }
      );
    }

    // Initialize Gemini
    console.log("Inicializando Gemini AI...");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create prompt for exam extraction
    const prompt = `Analise esta imagem de uma guia médica e extraia TODOS os nomes dos exames solicitados.
    
Retorne APENAS uma lista simples com os nomes dos exames, um por linha, sem numeração, sem formatação adicional.

Exemplos de exames que podem aparecer:
- Hemograma
- Glicose
- Colesterol Total
- HDL
- LDL
- Triglicerídeos
- Creatinina
- Ureia
- TSH
- T4 Livre
- Ácido Úrico
- TGO
- TGP
- Hemoglobina Glicada

Se não conseguir identificar nenhum exame, retorne apenas: "NENHUM EXAME IDENTIFICADO"`;

    // Analyze image
    console.log("Enviando imagem para análise...");
    let extractedText;
    try {
      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            mimeType: image.type,
            data: base64Image,
          },
        },
      ]);

      const response = await result.response;
      extractedText = response.text();
      console.log("Texto extraído:", extractedText.substring(0, 200) + "...");
      
      if (!extractedText || extractedText.trim() === "") {
        console.warn("Texto extraído está vazio");
        extractedText = "NENHUM EXAME IDENTIFICADO";
      }
    } catch (error) {
      console.error("Erro ao chamar Gemini API:", error);
      
      // Check if it's a quota/billing error
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      if (errorMessage.includes("quota") || errorMessage.includes("billing")) {
        return NextResponse.json(
          { error: "Limite de uso da API atingido ou problema de cobrança", details: errorMessage },
          { status: 429 }
        );
      }
      
      return NextResponse.json(
        { error: "Erro ao analisar a imagem com IA", details: errorMessage },
        { status: 500 }
      );
    }

    // Match exams from extracted text
    console.log("Buscando correspondências de exames...");
    const identifiedExams = matchExams(extractedText);
    console.log("Exames identificados:", identifiedExams.length);

    // Calculate total
    const total = identifiedExams.reduce((sum, exam) => sum + exam.preco, 0);
    console.log("Total calculado: R$", total.toFixed(2));

    console.log("=== Análise concluída com sucesso ===");
    return NextResponse.json({
      exams: identifiedExams,
      total,
      extractedText,
    });
  } catch (error) {
    console.error("=== ERRO GERAL ===");
    console.error("Error analyzing image:", error);
    console.error("Stack trace:", error instanceof Error ? error.stack : "N/A");
    
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return NextResponse.json(
      { 
        error: "Erro ao processar a imagem",
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}

function matchExams(text: string): Exam[] {
  const normalizedText = text.toLowerCase();
  const lines = normalizedText.split("\n").filter((line) => line.trim());

  const matched: Exam[] = [];
  const matchedIds = new Set<string>();

  for (const exam of exams) {
    // Check if exam name or any alias appears in the text
    const searchTerms = [
      exam.descricao.toLowerCase(),
      exam.mnemonico.toLowerCase(),
      ...exam.aliases,
    ];

    for (const term of searchTerms) {
      if (normalizedText.includes(term) && !matchedIds.has(exam.mnemonico)) {
        matched.push(exam);
        matchedIds.add(exam.mnemonico);
        break;
      }
    }
  }

  return matched;
}

function getMockExams(): Exam[] {
  // Return some sample exams for testing
  const mockExamCodes = ["HEMOGRAMA", "GLICOSE", "COL TOTAL", "HDL", "LDL"];
  const foundExams: Exam[] = [];
  
  for (const code of mockExamCodes) {
    const exam = exams.find((e) => e.mnemonico === code);
    if (exam) {
      foundExams.push(exam);
    }
  }
  
  return foundExams;
}
