# Learning Notes — arquitetura e manutenção

O site é um app **Nuxt 4 + Nuxt Content 3** (Vue 3, TypeScript) em `.frontend/`. Ele lê as notas em Markdown direto das pastas da raiz (`sql/`, `python/`, ...) e gera um site estático para o GitHub Pages, sem backend. A mesma base aceita rotas de servidor (`.frontend/server/`) quando o projeto precisar de contas, progresso sincronizado ou exercícios com banco de dados.

Até novembro de 2026 o site usava VitePress. A migração manteve os endereços antigos (`/sql/09-select.html`, `/frontend/`, `/trilhas/sql/`, `/pratica/...`), o progresso salvo dos leitores e a preferência de tema.

## Onde mexer

| Arquivo ou pasta | Responsabilidade |
| --- | --- |
| `.frontend/nuxt.config.ts` | Base `/learning-notes/`, fontes, destaque de código, pré-renderização e data de atualização (git) |
| `.frontend/content.config.ts` | Quais Markdown entram no site e os campos de frontmatter aceitos |
| `.frontend/app/assets/css/tokens.css` | Cores dos dois temas, fontes e medidas — a identidade "caderno" |
| `.frontend/app/assets/css/base.css` | Cabeçalho, páginas, trilhas, biblioteca, layout de leitura, busca, responsivo |
| `.frontend/app/assets/css/prose.css` | Tipografia das notas, blocos de código, tabelas e labs |
| `.frontend/app/pages/` | Rotas: início, biblioteca, índice, trilhas e `[...slug].vue` (toda nota) |
| `.frontend/app/components/` | Cabeçalho, busca, barra lateral, post-it da trilha, fim da etapa, labs |
| `.frontend/app/components/content/` | Componentes usados dentro do Markdown (labs, downloads) e `Prose*` (como o Markdown é desenhado) |
| `.frontend/app/lib/trails.ts` | Todas as trilhas: fundamentos e projetos aplicados |
| `.frontend/app/lib/notes.ts` | Catálogo, rótulos da navegação, menu de cada assunto |
| `.frontend/app/lib/progress.ts` | Leitura, migração e escrita do progresso local |
| `.frontend/app/lib/motion.ts` | Animações (entrada ao rolar, confete) — respeitam "reduzir movimento" |
| `.frontend/server/routes/search.json.ts` | Índice da busca (Ctrl K), gerado no build |
| `.frontend/scripts/` | `check-site.mjs` (checagem do build), `static-aliases.mjs` (endereços antigos), `serve.mjs` (preview igual ao GitHub Pages) |

## Escrever uma nota

Crie um `.md` na pasta do assunto. O primeiro `# Título` vira o título da página; o primeiro parágrafo vira a descrição na biblioteca (ou use `description:` no frontmatter). A nota aparece sozinha na biblioteca, no índice, na busca e no menu do assunto. Para um nome mais curto no menu, acrescente o arquivo ao mapa `labels` em `app/lib/notes.ts`.

Links entre notas podem ser escritos como arquivos: `[JOIN](./26-join.md)`, `[CSS](./02-css)` ou `/sql/26-join`. Imagens ficam ao lado da nota (`./imagens/x.svg`).

Componentes dentro do Markdown usam a sintaxe do Nuxt Content (MDC):

```md
::group-lab
::

Baixe o :exercise-download[script completo]{file="arquivos/pipeline.py"}.

[Abrir em nova aba](/exercicios/frontend/biblioteca.html){target="_blank"}
```

Os arquivos para download ficam em `public/exercicios/`.

## Criar ou mudar uma trilha

Adicione um objeto em `trails` (`app/lib/trails.ts`). `kind: 'fundamentos'` aparece no primeiro grupo de `/trilhas`; `kind: 'projeto'` em "Projetos aplicados" (com `intro` apontando para a página de introdução e `source` para o código de origem). A página `/trilhas/<id>` é criada automaticamente.

Cada etapa tem `id`, `title`, `url` e, opcionalmente, `outcome` (o que se aprende ali). **O `id` é o que fica salvo no navegador: nunca mude um id existente.** Ao renomear ou mover uma nota, mude só `url`. Os testes verificam ids repetidos e notas inexistentes; `check:site` confere o número de etapas de cada trilha (atualize a lista ao criar uma nova).

Uma nota que pertence a uma trilha sempre mostra o post-it da trilha e o botão de concluir, mesmo aberta pela biblioteca. `?trilha=<id>` só escolhe a trilha quando a nota faz parte de mais de uma.

## Progresso

Salvo em `learning-notes:progress:v2`, só no navegador:

```json
{ "version": 2, "completed": ["sql-select", "/frontend/01-html"] }
```

Trilhas de fundamentos usam ids como `sql-select`; as etapas que vieram dos antigos "Guias" usam a URL como id, o que preserva o que foi marcado antes. Sem v2, o site lê `learning-notes:practice:v1` (e converte endereços `/pratica/...`), sem apagar a chave antiga. Entradas desconhecidas são preservadas; uma versão futura não é sobrescrita; JSON corrompido é copiado para `learning-notes:progress:v2:backup`. Outra aba aberta é acompanhada pelo evento `storage`.

## Visual

A direção "caderno de estudos" está em `.claude/skills/design-direction/SKILL.md` (papel, tinta, caneta, marca-texto, vermelho de correção; Fraunces, Source Serif 4, JetBrains Mono e Caveat). Mude cores em `tokens.css`, mantendo `:root` e `:root.dark` em sincronia — `check:site` reprova contraste de texto abaixo de 4,5:1. O tema escolhido usa a chave `vitepress-theme-appearance` (mantida da versão anterior).

## Desenvolver e verificar

Node.js 22.5 ou mais novo (o Nuxt Content usa o SQLite nativo do Node).

```powershell
cd .frontend
npm.cmd ci
npm.cmd run dev          # http://localhost:3000/learning-notes/
npm.cmd test             # Vitest: trilhas, links, catálogo, progresso, labs
npm.cmd run build        # site estático em .output/public
npm.cmd run check:site   # notas, endereços antigos, links, downloads, busca, tema, contraste
npm.cmd run preview      # serve o build como o GitHub Pages: http://localhost:4173/learning-notes/
```

Testes dos exercícios Python, a partir da raiz: `python -B -m unittest discover -s .frontend/tests -p "test_*.py" -v`.

O GitHub Actions roda testes, build e `check:site` antes de publicar a `main`; o checkout usa o histórico completo para mostrar a data da última alteração de cada nota.

Para revisar o visual com screenshots reais e uma crítica de design, use o script `.claude/scripts/screenshots.mjs` e o agente `ui-critic` (instruções nos próprios arquivos).
