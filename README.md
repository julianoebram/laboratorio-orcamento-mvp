💉 Laboratório Orçamento MVP
Sistema web para geração automatizada de orçamentos de exames laboratoriais a partir de guias médicas. Ideal para clínicas, laboratórios e unidades de saúde que desejam agilizar o atendimento e padronizar precificação.

🚀 Objetivo
Criar um MVP funcional que permita:

Upload de imagens de guias médicas

Extração automática dos exames solicitados via OCR

Cruzamento com tabelas de preços específicas (particular, convênio, empresa)

Geração de orçamento detalhado com valores individuais e total

🧱 Estrutura do Projeto
Código
laboratorio-orcamento-mvp/
├── backend/              # API Flask + OCR + cálculo de orçamento
│   ├── app.py
│   ├── routes/
│   ├── services/
│   ├── data/
│   └── requirements.txt
├── frontend/             # Interface web (em desenvolvimento)
├── docs/                 # Documentação técnica e escopo
├── README.md             # Visão geral do projeto
└── .gitignore
🧪 Tecnologias utilizadas
Backend: Python + Flask

OCR: Tesseract

Banco de dados: SQLite (MVP) com suporte a múltiplas tabelas de preços

Frontend: React.js (em desenvolvimento)

Hospedagem: Vercel / Railway / Render

📦 Funcionalidades
Upload de imagem da guia médica

Extração de exames via OCR

Seleção de tipo de tabela (particular, convênio, empresa)

Cálculo automático do orçamento

Retorno em JSON (pronto para integração com frontend)

📌 Próximos passos
Finalizar interface web para upload e visualização

Adicionar painel administrativo para cadastro de exames e tabelas

Exportação de orçamento em PDF

Integração com WhatsApp para envio automático
