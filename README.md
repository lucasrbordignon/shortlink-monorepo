# 🚀 API de Shortlink

Esta é uma API de alto desempenho para encurtar URLs, gerar slugs únicos e redirecionar para a URL original. O projeto utiliza uma arquitetura moderna com **Node.js, TypeScript e workers**, otimizado para lidar com alto volume de requisições.

## 🌟 Recursos Principais

-   **Encurtador de URLs:** Recebe uma URL longa e a converte em um link curto único.
-   **Geração de Slugs:** Slugs aleatórios e únicos são gerados para cada URL encurtada.
-   **Redirecionamento Rápido:** Redireciona usuários do link encurtado para a URL original com redirecionamento **HTTP 302**.
-   **Rate Limiting:** Proteção contra abusos e ataques de negação de serviço.
-   **Arquitetura de Worker:** Utiliza um worker separado para processar tarefas em segundo plano, garantindo que o endpoint principal permaneça responsivo.
-   **Testes Automatizados:** Cobertura de testes unitários para as rotas e serviços.
-   **Documentação Interativa:** Inclui um arquivo `openapi.yaml` que pode ser visualizado com ferramentas como o Swagger UI.

## 🛠️ Tecnologias Utilizadas

-   **Node.js & TypeScript:** Para o desenvolvimento do back-end.
-   **Express:** Framework para lidar com as rotas.
-   **Redis:** Como banco de dados para o `rate limiter` e cache.
-   **Banco de dados relacional:** Utilizado para persistir as URLs encurtadas.
-   **Docker:** Para conteinerizar a aplicação e seus serviços (banco de dados, Redis).
-   **Jest:** Framework de testes.
-   **Wrangler (Cloudflare Workers):** Para o worker, permitindo processamento em um ambiente serverless.
-   **Swagger/OpenAPI:** Para a documentação da API.

## 🚀 Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone [https://docs.github.com/articles/referencing-and-citing-content](https://docs.github.com/articles/referencing-and-citing-content)
    cd [pasta do projeto]
    ```

2.  **Configurar Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
    ```
    # Exemplo:
    DATABASE_URL=
    REDIS_URL=
    ```

3.  **Docker e Docker Compose:**
    O projeto utiliza Docker Compose para gerenciar o banco de dados e o Redis.
    ```bash
    docker-compose up -d
    ```

4.  **Instalar Dependências:**
    ```bash
    npm install
    ```

5.  **Rodar a Aplicação:**
    ```bash
    npm run dev
    ```

## 📝 Endpoints da API

A documentação interativa da API pode ser encontrada no `openapi.yaml`. Você pode usar o [Swagger Editor](https://editor.swagger.io/) para visualizar e testar os endpoints.

| Método | Endpoint         | Descrição                    |
|--------|------------------|------------------------------|
| `POST` | `/shorten`       | Encurta uma URL.             |
| `GET`  | `/{slug}`        | Redireciona para a URL original. |
| `GET`  | `/docs`          | (Opcional) Visualiza a documentação da API. |

## 🧪 Testes

Para rodar os testes unitários da aplicação:

```bash
npm test