# 💉 Laboratório - Orçamento de Exames

Sistema web para geração automatizada de orçamentos de exames laboratoriais a partir de guias médicas.

## 🚀 Funcionalidades

- ✅ Upload de imagens de guias médicas (drag & drop ou seleção)
- ✅ Análise automática usando Google Gemini Vision AI
- ✅ Identificação inteligente de exames solicitados
- ✅ Cálculo automático de preços baseado em tabela
- ✅ Interface moderna e responsiva
- ✅ Visualização detalhada do orçamento

## 🛠️ Tecnologias

- **Next.js 16** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização moderna
- **Google Gemini AI** - Análise de imagem e OCR
- **React 19** - Interface do usuário

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd sandbox
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure a API Key do Google Gemini:
```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione sua chave da API do Google Gemini:
```
GEMINI_API_KEY=sua_chave_aqui
```

> 🔑 Obtenha sua chave gratuita em: https://makersuite.google.com/app/apikey

## 🚀 Como Usar

1. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

2. Abra o navegador em `http://localhost:3000`

3. Faça upload de uma imagem da guia médica

4. Clique em "Analisar Exames"

5. Visualize o orçamento gerado automaticamente

## 📋 Tabela de Exames

O sistema possui 26 exames cadastrados com preços atualizados:

- Hemograma Completo - R$ 19,90
- Glicose - R$ 18,90
- Colesterol Total - R$ 22,90
- HDL / LDL - R$ 22,90 cada
- Triglicerídeos - R$ 22,90
- TSH - R$ 31,90
- Hemoglobina Glicada - R$ 38,50
- E muitos outros...

Veja a lista completa em `data/exams.json`

## 🏗️ Estrutura do Projeto

```
sandbox/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts      # API endpoint para análise
│   ├── globals.css           # Estilos globais
│   ├── layout.tsx            # Layout principal
│   └── page.tsx              # Página inicial
├── data/
│   └── exams.json            # Banco de dados de exames
├── .env.example              # Exemplo de variáveis de ambiente
├── next.config.ts            # Configuração do Next.js
├── tailwind.config.ts        # Configuração do Tailwind
└── tsconfig.json             # Configuração do TypeScript
```

## 🔧 Build para Produção

```bash
pnpm build
pnpm start
```

## 🧪 Modo de Teste

Se a API Key do Gemini não estiver configurada, o sistema retorna dados de exemplo para testes.

## 📝 Notas

- A análise funciona melhor com imagens claras e legíveis
- Formatos suportados: JPG, PNG, WEBP
- O sistema identifica exames por nome, código ou aliases
- Todos os preços são baseados na tabela DB BARRA VELHA - 4987

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

ISC
