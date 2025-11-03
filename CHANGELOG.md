# Changelog

## [1.1.0] - 2025-11-03

### ✨ Melhorias

#### Backend (`app/api/analyze/route.ts`)
- ✅ Adicionado validação de tipo de imagem mais robusta
- ✅ Adicionado validação de tamanho máximo de imagem (10MB)
- ✅ Melhorado tratamento de erros da API Gemini
- ✅ Adicionado detecção específica de erros de quota/billing
- ✅ Adicionado validação de texto extraído vazio
- ✅ Melhorado logs de debug para facilitar troubleshooting

#### Frontend (`app/page.tsx`)
- ✅ Melhorado tratamento de erros na requisição
- ✅ Adicionado parsing de mensagens de erro do backend
- ✅ Melhorado feedback visual de erros para o usuário
- ✅ Adicionado logs no console para debug

### 📚 Documentação

- ✅ Criado `TROUBLESHOOTING.md` - Guia completo de solução de problemas
- ✅ Criado `test-api.js` - Script de teste e validação
- ✅ Criado `.env.local` - Arquivo de configuração local
- ✅ Atualizado `README.md` com seção de troubleshooting
- ✅ Criado `CHANGELOG.md` - Histórico de alterações

### 🔧 Configuração

- ✅ Adicionado arquivo `.env.local` para desenvolvimento local
- ✅ Melhorado `.env.example` com instruções claras

### 🐛 Correções

- ✅ Corrigido tipagem do FormData para evitar erros de null
- ✅ Adicionado validação de tipo MIME antes de processar
- ✅ Melhorado tratamento de exceções em todas as etapas

### 🧪 Testes

- ✅ Adicionado script de validação de configuração
- ✅ Adicionado checklist de diagnóstico
- ✅ Melhorado logs para facilitar debug

## [1.0.0] - 2025-11-02

### 🎉 Lançamento Inicial

- ✅ Sistema de upload de imagens
- ✅ Integração com Google Gemini AI
- ✅ Análise automática de guias médicas
- ✅ Cálculo de orçamentos
- ✅ Interface moderna com Tailwind CSS
- ✅ 26 exames cadastrados
- ✅ Modo mock para testes sem API Key
