# 🔧 Guia de Solução de Problemas

## Erro no endpoint `/api/analyze`

### Sintomas Comuns

1. **Erro 400 - Bad Request**
   - Nenhuma imagem foi enviada
   - Tipo de arquivo inválido
   - Imagem muito grande (>10MB)

2. **Erro 429 - Too Many Requests**
   - Limite de uso da API Gemini atingido
   - Problema de cobrança/billing

3. **Erro 500 - Internal Server Error**
   - Erro ao processar a imagem
   - Erro ao chamar a API do Gemini
   - Erro ao fazer match dos exames

### Soluções

#### 1. Configurar a API Key do Gemini

Se você não configurou a API Key, o sistema retorna dados mock (exemplos). Para usar a análise real:

1. Obtenha uma API Key gratuita em: https://makersuite.google.com/app/apikey
2. Crie um arquivo `.env.local` na raiz do projeto:
   ```bash
   cp .env.example .env.local
   ```
3. Edite o arquivo `.env.local` e adicione sua chave:
   ```
   GEMINI_API_KEY=sua_chave_aqui
   ```
4. Reinicie o servidor de desenvolvimento

#### 2. Verificar o Console do Navegador

Abra o DevTools do navegador (F12) e verifique:
- **Console**: Mensagens de erro JavaScript
- **Network**: Status da requisição para `/api/analyze`
- **Response**: Corpo da resposta de erro

#### 3. Verificar os Logs do Servidor

No terminal onde o servidor está rodando, procure por:
```
=== Iniciando análise de imagem ===
FormData recebido com sucesso
Imagem recebida: ...
```

Se houver erros, eles aparecerão aqui com detalhes.

#### 4. Testar com Imagem Diferente

- Use uma imagem menor (<5MB)
- Use formato JPG ou PNG
- Certifique-se de que a imagem contém texto legível
- Tente com uma guia médica real ou simulada

#### 5. Verificar Permissões de CORS

Se estiver rodando em produção, verifique se o domínio está configurado corretamente.

#### 6. Limpar Cache e Rebuild

```bash
# Limpar cache do Next.js
rm -rf .next

# Reinstalar dependências
npm install

# Rebuild
npm run build

# Rodar em modo desenvolvimento
npm run dev
```

### Modo de Teste (Sem API Key)

Se você não configurar a `GEMINI_API_KEY`, o sistema retorna automaticamente dados de exemplo:
- Hemograma Completo
- Glicose
- Colesterol Total
- HDL
- LDL

Isso é útil para testar a interface sem gastar créditos da API.

### Erros Específicos

#### "Erro ao processar o formulário"
- Problema ao fazer parse do FormData
- Verifique se o frontend está enviando corretamente

#### "Nenhuma imagem foi enviada"
- O campo `image` não está presente no FormData
- Verifique o código do frontend

#### "O arquivo enviado não é uma imagem válida"
- Tipo MIME inválido
- Use apenas JPG, PNG, WEBP, GIF

#### "A imagem é muito grande"
- Tamanho máximo: 10MB
- Comprima a imagem antes de enviar

#### "Erro ao analisar a imagem com IA"
- Problema na API do Gemini
- Verifique sua API Key
- Verifique se há créditos disponíveis
- Verifique os logs do servidor para mais detalhes

#### "Limite de uso da API atingido"
- Você excedeu a cota gratuita do Gemini
- Aguarde o reset da cota ou configure billing

### Contato e Suporte

Se o problema persistir:
1. Verifique os logs completos do servidor
2. Verifique o console do navegador
3. Teste com dados mock (sem API Key)
4. Verifique a documentação do Gemini: https://ai.google.dev/docs

## Checklist de Diagnóstico

- [ ] API Key configurada corretamente
- [ ] Servidor rodando sem erros
- [ ] Imagem válida (JPG/PNG, <10MB)
- [ ] Console do navegador sem erros
- [ ] Network request retorna 200 OK
- [ ] Logs do servidor mostram processamento correto
- [ ] Arquivo `.env.local` existe e está correto
- [ ] Dependências instaladas (`npm install`)
- [ ] Build bem-sucedido (`npm run build`)
