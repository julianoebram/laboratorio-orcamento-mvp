"use client";

import { useState } from "react";

interface ExamResult {
  codigo: string;
  mnemonico: string;
  descricao: string;
  material: string;
  prazo: string;
  preco: number;
}

interface AnalysisResult {
  exams: ExamResult[];
  total: number;
  extractedText?: string;
}

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError("");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError("");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao analisar a imagem");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            💉 Orçamento de Exames Laboratoriais
          </h1>
          <p className="text-lg text-gray-600">
            Faça upload da guia médica e obtenha o orçamento automaticamente
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-3 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-indigo-500 transition-colors cursor-pointer"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="space-y-4">
                <div className="text-6xl">📄</div>
                <div>
                  <p className="text-xl font-semibold text-gray-700">
                    Arraste a imagem aqui ou clique para selecionar
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Formatos aceitos: JPG, PNG, WEBP
                  </p>
                </div>
              </div>
            </label>
          </div>

          {/* Image Preview */}
          {previewUrl && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Imagem Selecionada:
              </h3>
              <div className="relative rounded-lg overflow-hidden border-2 border-gray-200">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-auto max-h-96 object-contain bg-gray-50"
                />
              </div>
              <button
                onClick={analyzeImage}
                disabled={loading}
                className="mt-6 w-full bg-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-lg"
              >
                {loading ? "Analisando..." : "🔍 Analisar Exames"}
              </button>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8">
            <p className="text-red-800 font-semibold">❌ {error}</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              📊 Resultado da Análise
            </h2>

            {result.exams.length === 0 ? (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                <p className="text-yellow-800 font-semibold">
                  ⚠️ Nenhum exame foi identificado na imagem. Tente com uma imagem mais clara.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {result.exams.map((exam, index) => (
                    <div
                      key={index}
                      className="border-2 border-gray-200 rounded-xl p-5 hover:border-indigo-300 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900">
                            {exam.descricao}
                          </h3>
                          <div className="mt-2 space-y-1 text-sm text-gray-600">
                            {exam.codigo && (
                              <p>
                                <span className="font-semibold">Código:</span> {exam.codigo}
                              </p>
                            )}
                            <p>
                              <span className="font-semibold">Material:</span> {exam.material}
                            </p>
                            <p>
                              <span className="font-semibold">Prazo:</span> {exam.prazo}
                            </p>
                          </div>
                        </div>
                        <div className="ml-4 text-right">
                          <p className="text-2xl font-bold text-indigo-600">
                            R$ {exam.preco.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="border-t-3 border-gray-300 pt-6">
                  <div className="flex justify-between items-center bg-indigo-50 rounded-xl p-6">
                    <span className="text-2xl font-bold text-gray-900">
                      Total do Orçamento:
                    </span>
                    <span className="text-3xl font-bold text-indigo-600">
                      R$ {result.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Extracted Text (Debug) */}
                {result.extractedText && (
                  <details className="mt-6">
                    <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-900">
                      Ver texto extraído (debug)
                    </summary>
                    <pre className="mt-2 p-4 bg-gray-50 rounded-lg text-xs overflow-auto">
                      {result.extractedText}
                    </pre>
                  </details>
                )}
              </>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            Sistema desenvolvido para agilizar orçamentos de exames laboratoriais
          </p>
        </div>
      </div>
    </div>
  );
}
