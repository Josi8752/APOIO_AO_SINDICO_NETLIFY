# SINDICOOPS_IA

Sistema de atendimento inteligente para condomínios, com classificação automática de chamados, priorização por risco e armazenamento em nuvem.

---

## 🚨 O problema (a dor real)

Administradoras e síndicos lidam diariamente com:

- Chamados espalhados em WhatsApp, e-mail e telefone
- Falta de prioridade clara (tudo parece “urgente”)
- Perda de histórico de reclamações
- Dificuldade para justificar decisões e prazos
- Risco jurídico por falta de registro formal

O resultado é:
- retrabalho
- conflito com moradores
- decisões baseadas em sensação, não em dados

---

## ✅ A solução

O **SINDICOOPS_IA** centraliza o atendimento e transforma mensagens em **chamados estruturados**, com:

- Classificação automática (categoria, urgência, sentimento)
- Score de risco para priorização
- Registro permanente em banco de dados
- Histórico auditável de resoluções
- Interface simples para operação diária

Tudo isso sem depender de planilhas, WhatsApp ou memória humana.

---

## 🧠 Como funciona (visão técnica)

### Arquitetura
- **Frontend:** React + TypeScript + Vite
- **Backend:** Netlify Functions (serverless)
- **Banco:** Supabase (PostgreSQL)
- **Validação:** Zod (backend)
- **Deploy:** Netlify

### Fluxo
1. Morador envia mensagem no chat
2. Classificação automática (regras + score)
3. Backend grava o chamado no Supabase
4. Operador visualiza, prioriza e resolve
5. Tudo fica registrado

---

## 🖥️ Usabilidade (como o usuário opera)

### Atendimento
- Digita a mensagem do morador
- O sistema cria o chamado automaticamente
- Feedback imediato de registro

### Tickets
- Visualização por urgência e score
- Detalhamento com fatores
- Resolução com 1 clique

### Relatórios
- Total de chamados
- Pendentes vs resolvidos
- Tickets críticos
- Base para tomada de decisão

---

## 📦 Armazenamento dos dados

- Chamados armazenados no **Supabase**
- Persistência entre sessões e máquinas
- Campos principais:
  - unidade
  - mensagem
  - categoria
  - urgência
  - sentimento
  - score
  - status
  - data/hora
  - fatores

---

## 🔐 Segurança

- Chaves sensíveis ficam apenas no backend (Functions)
- `.env` não é versionado (ver `.gitignore`)
- Estrutura preparada para autenticação e RLS

---

## 🚀 Como rodar o projeto (local)

### Pré-requisitos
- Node.js 20+
- Netlify CLI
- Projeto no Supabase com tabela `tickets`

### Instalar dependências
```bash
npm install
Projeto React + Vite + Tailwind + TypeScript.

---

## Entregáveis
- Arquivos gerados automaticamente na raiz do projeto.

---

## Validação
**Onde executar:** `~/sindicoops-ia/sindicoops-ia`

```bash
ls -la .gitignore README.md
