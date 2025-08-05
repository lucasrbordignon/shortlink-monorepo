# 🔗 Shortlink Monorepo

Este monorepo contém os pacotes necessários para um encurtador de URLs robusto com proteção e performance.

## 📁 Estrutura

```
shortlink-monorepo/
├── packages/
│   ├── api/         # API Express com Redis + PostgreSQL
│   └── worker/      # Cloudflare Worker (redirecionamento rápido)
├── docker-compose.yml
└── README.md
```

## 🚀 Como rodar

1. Suba o Redis e o Postgres:
```bash
docker-compose up -d
```

2. Na pasta da API (`packages/api`), instale as dependências e rode:
```bash
cd packages/api
npm install
npm run dev
```

3. Depois, você pode publicar o Worker a partir da pasta `packages/worker`.

## 📌 Stack

- [x] Node.js + Express
- [x] PostgreSQL
- [x] Redis
- [x] Cloudflare Workers
- [x] Cloudflare Logpush (em breve)
- [x] Automação de Firewall via API (em breve)
