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
    const formData = await request.formData();
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json(
        { error: "Nenhuma imagem foi enviada" },
        { status: 400 }
      );
    }

    // Check if API key is configured
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return mock data for testing without API key
      return NextResponse.json({
        exams: getMockExams(),
        total: getMockExams().reduce((sum, exam) => sum + exam.preco, 0),
        extractedText: "API Key não configurada - usando dados de exemplo",
      });
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    // Initialize Gemini
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
    const extractedText = response.text();

    // Match exams from extracted text
    const identifiedExams = matchExams(extractedText);

    // Calculate total
    const total = identifiedExams.reduce((sum, exam) => sum + exam.preco, 0);

    return NextResponse.json({
      exams: identifiedExams,
      total,
      extractedText,
    });
  } catch (error) {
    console.error("Error analyzing image:", error);
    return NextResponse.json(
      { error: "Erro ao processar a imagem" },
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
  return [
    exams.find((e) => e.mnemonico === "HEMOGRAMA")!,
    exams.find((e) => e.mnemonico === "GLICOSE")!,
    exams.find((e) => e.mnemonico === "COL TOTAL")!,
    exams.find((e) => e.mnemonico === "HDL")!,
    exams.find((e) => e.mnemonico === "LDL")!,
  ].filter(Boolean);
}
