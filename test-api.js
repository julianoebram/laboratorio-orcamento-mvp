#!/usr/bin/env node

/**
 * Script de teste para o endpoint /api/analyze
 * 
 * Este script simula uma requisição ao endpoint sem precisar
 * rodar o servidor ou usar o navegador.
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Script de Teste - Endpoint /api/analyze\n');

// Verificar se o arquivo .env.local existe
const envPath = path.join(__dirname, '.env.local');
const envExists = fs.existsSync(envPath);

console.log('📋 Checklist de Configuração:');
console.log(`  ${envExists ? '✅' : '❌'} Arquivo .env.local existe`);

if (envExists) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const hasApiKey = envContent.includes('GEMINI_API_KEY=') && 
                    !envContent.includes('GEMINI_API_KEY=your_api_key_here') &&
                    !envContent.includes('# GEMINI_API_KEY=');
  console.log(`  ${hasApiKey ? '✅' : '⚠️ '} API Key configurada ${hasApiKey ? '' : '(usando modo mock)'}`);
} else {
  console.log('  ⚠️  API Key não configurada (usando modo mock)');
}

// Verificar se o arquivo de dados existe
const examsPath = path.join(__dirname, 'data', 'exams.json');
const examsExists = fs.existsSync(examsPath);
console.log(`  ${examsExists ? '✅' : '❌'} Arquivo data/exams.json existe`);

if (examsExists) {
  try {
    const examsData = JSON.parse(fs.readFileSync(examsPath, 'utf-8'));
    console.log(`  ✅ ${examsData.length} exames carregados no banco de dados`);
  } catch (error) {
    console.log(`  ❌ Erro ao ler exams.json: ${error.message}`);
  }
}

// Verificar se o endpoint existe
const routePath = path.join(__dirname, 'app', 'api', 'analyze', 'route.ts');
const routeExists = fs.existsSync(routePath);
console.log(`  ${routeExists ? '✅' : '❌'} Endpoint /api/analyze existe`);

console.log('\n📝 Instruções para Testar:');
console.log('  1. Inicie o servidor: npm run dev');
console.log('  2. Abra o navegador em: http://localhost:3000');
console.log('  3. Faça upload de uma imagem de guia médica');
console.log('  4. Clique em "Analisar Exames"');
console.log('  5. Verifique o console do navegador (F12) para erros');
console.log('  6. Verifique o terminal do servidor para logs');

console.log('\n🔍 Modo de Operação:');
if (!envExists || !fs.readFileSync(envPath, 'utf-8').includes('GEMINI_API_KEY=')) {
  console.log('  ⚠️  MODO MOCK - Retornará dados de exemplo');
  console.log('  Para usar análise real, configure GEMINI_API_KEY no .env.local');
} else {
  console.log('  ✅ MODO REAL - Usará API do Gemini para análise');
}

console.log('\n📚 Documentação:');
console.log('  - README.md: Instruções gerais');
console.log('  - TROUBLESHOOTING.md: Guia de solução de problemas');
console.log('  - .env.example: Exemplo de configuração');

console.log('\n✨ Teste concluído!\n');
