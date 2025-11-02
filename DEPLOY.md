# 🚀 Guia de Deploy - Laboratório Orçamento

## Opção 1: Deploy na Vercel (Recomendado)

### Passo a Passo:

1. **Criar conta na Vercel**
   - Acesse: https://vercel.com/signup
   - Faça login com GitHub

2. **Importar Projeto**
   - Clique em "Add New Project"
   - Selecione seu repositório GitHub
   - Clique em "Import"

3. **Configurar Variáveis de Ambiente**
   - Na tela de configuração, vá em "Environment Variables"
   - Adicione:
     - Nome: `GEMINI_API_KEY`
     - Valor: Sua chave da API do Google Gemini
   - Obtenha sua chave em: https://makersuite.google.com/app/apikey

4. **Deploy**
   - Clique em "Deploy"
   - Aguarde 2-3 minutos
   - Sua aplicação estará no ar! 🎉

5. **URL Final**
   - Você receberá uma URL tipo: `https://seu-projeto.vercel.app`
   - Pode configurar domínio customizado depois

### Atualizações Automáticas:
- Cada push no GitHub faz deploy automático
- Branches criam preview deployments

---

## Opção 2: Deploy na Netlify

### Passo a Passo:

1. **Criar conta na Netlify**
   - Acesse: https://app.netlify.com/signup
   - Faça login com GitHub

2. **Importar Projeto**
   - Clique em "Add new site" → "Import an existing project"
   - Conecte ao GitHub e selecione o repositório

3. **Configurar Build**
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Variáveis de Ambiente**
   - Vá em "Site settings" → "Environment variables"
   - Adicione `GEMINI_API_KEY` com sua chave

5. **Deploy**
   - Clique em "Deploy site"
   - URL: `https://seu-projeto.netlify.app`

---

## Opção 3: Deploy na Railway

### Passo a Passo:

1. **Criar conta na Railway**
   - Acesse: https://railway.app
   - Faça login com GitHub

2. **Novo Projeto**
   - Clique em "New Project"
   - Selecione "Deploy from GitHub repo"
   - Escolha seu repositório

3. **Configurar**
   - Railway detecta Next.js automaticamente
   - Adicione variável `GEMINI_API_KEY` nas Settings

4. **Deploy**
   - Deploy automático
   - URL gerada automaticamente

---

## Opção 4: Deploy na Render

### Passo a Passo:

1. **Criar conta na Render**
   - Acesse: https://render.com
   - Faça login com GitHub

2. **Novo Web Service**
   - Clique em "New +" → "Web Service"
   - Conecte seu repositório

3. **Configurar**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Adicione `GEMINI_API_KEY` em Environment

4. **Deploy**
   - Clique em "Create Web Service"
   - Aguarde o deploy

---

## 🔑 Obtendo a API Key do Google Gemini

1. Acesse: https://makersuite.google.com/app/apikey
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave gerada
5. **IMPORTANTE:** Nunca compartilhe ou commite essa chave no código!

---

## ✅ Checklist Pré-Deploy

- [ ] Código commitado no GitHub
- [ ] API Key do Gemini obtida
- [ ] Plataforma de hospedagem escolhida
- [ ] Conta criada na plataforma
- [ ] Variável de ambiente configurada
- [ ] Build local testado (`npm run build`)

---

## 🧪 Testar Build Local

Antes de fazer deploy, teste localmente:

```bash
# Instalar dependências
npm install

# Build de produção
npm run build

# Testar build
npm start
```

Acesse `http://localhost:3000` para verificar se está tudo funcionando.

---

## 📊 Comparação de Plataformas

| Plataforma | Gratuito | Facilidade | Next.js | Recomendação |
|------------|----------|------------|---------|--------------|
| **Vercel** | ✅ Sim   | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | **Melhor** |
| Netlify    | ✅ Sim   | ⭐⭐⭐⭐   | ⭐⭐⭐⭐   | Ótima      |
| Railway    | ⚠️ $5/mês | ⭐⭐⭐⭐   | ⭐⭐⭐⭐   | Boa        |
| Render     | ✅ Sim   | ⭐⭐⭐     | ⭐⭐⭐     | Boa        |

---

## 🆘 Problemas Comuns

### Build falha
- Verifique se todas as dependências estão no `package.json`
- Rode `npm run build` localmente primeiro

### API não funciona
- Verifique se `GEMINI_API_KEY` está configurada
- Confirme que a chave é válida

### Imagens não carregam
- Verifique o tamanho máximo de upload da plataforma
- Vercel: 4.5MB por request no plano gratuito

---

## 📞 Suporte

- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com
- Railway: https://docs.railway.app
- Render: https://render.com/docs

---

**Recomendação Final:** Use **Vercel** para melhor experiência com Next.js! 🚀
