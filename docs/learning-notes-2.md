# Learning Notes 2.0 — arquitetura e manutenção

## Auditoria antes da implementação

O projeto usa Vue 3, TypeScript e VitePress 1.6.4, sem backend. A configuração em `.frontend/.vitepress/config.mts` mantém `srcDir: '..'` e o base `/learning-notes/`. O deploy do GitHub Pages compila `.frontend/.vitepress/dist` e executa Vitest e `check:site` antes de publicar.

As 71 notas existentes ficam em seis pastas de assuntos. `subjects.ts` é o cadastro compartilhado de assuntos; `notes.data.ts` lê os Markdown durante o build, produzindo títulos, descrições e categorias. A biblioteca já tem busca sem acentos, filtros e paginação. O índice completo e os testes de cobertura impedem que notas fiquem sem acesso.

O tema estende o tema padrão do VitePress. `StudyLayout.vue` acrescenta contexto e navegação aos quatro guias de `paths.ts`. O progresso anterior é uma lista de URLs em `learning-notes:practice:v1`, com compatibilidade para endereços antigos de `/pratica/`. A busca local, os botões de copiar código, o menu móvel e o controle de aparência já vêm do VitePress e serão mantidos.

## Plano

1. Consolidar tokens neutros e componentes de apresentação, refazer início e navegação e preservar a biblioteca de consulta.
2. Acrescentar trilhas declarativas de SQL e Python, usando os arquivos existentes.
3. Conectar cada etapa por contexto explícito na URL e migrar progresso sem apagar a chave antiga.
4. Verificar persistência, teclado, rotas e conteúdo no build; registrar limites da validação visual.

Escopo: somente redesign e trilhas. Os laboratórios existentes são preservados; nenhum novo jogo, backend, login, ranking ou sistema de pontos é introduzido.

## Onde mexer

| Arquivo ou pasta | Responsabilidade |
| --- | --- |
| `.frontend/.vitepress/config.mts` | Rotas principais, busca local, tema e base de publicação |
| `.frontend/.vitepress/theme/tokens.css` | Cores dos dois temas, fontes, espaçamentos e raios |
| `.frontend/.vitepress/theme/style.css` | Layouts e regras responsivas dos componentes |
| `.frontend/.vitepress/theme/components/LibraryHome.vue` | Início, assuntos e trilhas em destaque |
| `LibraryCatalog.vue` e `LibraryIndex.vue`, na mesma pasta | Busca com filtros e índice completo |
| `LearningTrails.vue`, `LearningPathCard.vue`, `LearningTrail.vue` | Catálogo, resumo e página de uma trilha |
| `ProgressIndicator.vue` e `SectionHeader.vue` | Progresso acessível e títulos de seções reutilizáveis |
| `StudyLayout.vue` e `TrailLessonContext.vue` | Leitura normal, contexto da trilha e navegação entre etapas |
| `.frontend/.vitepress/theme/trails.ts` | Definição tipada e ordenada das trilhas |
| `.frontend/.vitepress/theme/progress.ts` | Leitura, migração e escrita do progresso local |
| `.frontend/.vitepress/theme/trail-context.ts` | Contexto explícito da trilha na URL |

Os componentes de laboratório e os guias práticos anteriores continuam funcionando. `paths.ts` mantém esses guias; `trails.ts` organiza as novas jornadas de fundamentos. Não é necessário copiar uma aula para vinculá-la a uma trilha.

## Alterar cores e fontes

Abra `tokens.css`. `:root` define o tema claro e `.dark` altera somente as cores do tema escuro. `--vp-c-bg` é o fundo; `--vp-c-text-1` é o texto principal; `--vp-c-brand-1` é o destaque neutro. Os tons discretos foram ajustados para manter contraste de texto em superfícies claras e escuras.

Altere `--vp-font-family-base` para a interface e `--vp-font-family-mono` para código. O site usa fontes locais e alternativas do sistema, sem baixar uma fonte externa. `--space-*` e `--radius-*` centralizam medidas dos novos componentes. Procure a classe do componente em `style.css` para mudar seu layout, em vez de adicionar estilos no final que sobrescrevam regras existentes.

`appearance: true` reutiliza o controle nativo do VitePress. Sem preferência salva, segue o sistema. A escolha manual usa a chave `vitepress-theme-appearance`. O menu móvel, a busca e os botões de copiar código também são nativos.

## Criar uma trilha

1. Adicione um objeto ao array `trails` em `trails.ts`, seguindo o tipo `LearningTrail`.
2. Use um `id` estável, como `nova-trilha`, e escreva título, descrição, nível, assuntos, pré-requisitos e objetivos reais.
3. Liste as etapas na ordem de estudo. Cada uma precisa de `id`, `title`, `url` e `outcome` (o que se aprende naquela página).
4. Crie `trilhas/nova-trilha/index.md` com o conteúdo abaixo.

```md
---
layout: page
title: Nome da trilha
description: Uma descrição curta e fiel ao conteúdo.
---

<LearningTrail id="nova-trilha" />
```

Exemplo de referência a uma nota existente:

```ts
{ id: 'sql-select', title: 'Selecionar dados com SELECT',
  url: '/sql/09-select', outcome: 'Escolher colunas e dar nomes aos resultados.' }
```

O exemplo já existe na trilha SQL: não reutilize seu ID para outro conteúdo. Ao renomear um título ou mover um arquivo, mantenha o ID para preservar o progresso. As URLs são relativas à raiz do site, sem `/learning-notes/`; os componentes usam `withBase` para acrescentar esse prefixo.

Para acrescentar uma etapa, inclua-a no array `steps`, apontando para um Markdown existente. O número de etapas e o progresso são calculados. Os testes verificam IDs duplicados e arquivos ausentes. A checagem de build também verifica as páginas das trilhas: ao adicionar uma nova, acrescente sua expectativa em `check:site`.

## Contexto e progresso

Um link de etapa tem o formato `/sql/09-select?trilha=sql`. `resolveTrailContext` aceita o contexto somente se aquela nota pertence à trilha indicada. A navegação anterior/próxima conserva o parâmetro; abrir a mesma nota diretamente pela biblioteca não herda a trilha. A URL pode ser recarregada ou compartilhada.

O progresso atual é salvo em `learning-notes:progress:v2`:

```json
{ "version": 2, "completed": ["sql-select", "/frontend/01-html"] }
```

As novas trilhas usam IDs estáveis. Os guias antigos mantêm suas URLs como identificadores por compatibilidade. Na ausência de v2, o sistema lê `learning-notes:practice:v1`, normaliza endereços antigos e só grava a versão nova quando o usuário altera uma marcação. A chave antiga não é apagada nem sobrescrita. Depois da migração, v2 é a fonte de verdade, evitando recuperar marcações já desfeitas.

Entradas desconhecidas são preservadas na escrita, mas não contam no progresso atual. Uma versão futura não é sobrescrita. JSON corrompido em v2 é copiado para `learning-notes:progress:v2:backup` antes da recuperação. Se ler ou salvar falhar, o site informa o problema e mantém o acesso às páginas. Eventos `storage` atualizam a interface quando outra aba altera o progresso. Não há sincronização com servidor.

## Desenvolver e verificar

Na raiz do repositório, com Node.js instalado (o CI usa Node 20):

```powershell
cd .frontend
npm.cmd ci
npm.cmd run docs:dev
```

Abra o endereço exibido no terminal, incluindo `/learning-notes/`. Em outros sistemas, `npm` substitui `npm.cmd`.

```powershell
npm.cmd test
npm.cmd run docs:build
npm.cmd run check:site
npm.cmd run docs:preview
```

O preview serve o build de produção. Testes de exercícios existentes, a partir da raiz:

```powershell
python -B -m unittest discover -s .frontend/tests -p "test_*.py" -v
```

Vitest cobre filtros, teclado, guias anteriores, trilhas, migração e falhas de armazenamento. `check:site` compara todas as notas com o índice e o build, verifica links, imagens, downloads, entradas das trilhas e contraste das cores de texto. O GitHub Actions executa testes, build e checagem antes de publicar na `main`. Não há mudança no destino do deploy.

## Conferência visual

No navegador, revise início, biblioteca, trilhas e uma aula em 390 px, 768 px e 1280 px, nos dois temas. Use Tab e Enter, abra o menu móvel, teste a busca e copie um bloco de código. Marque uma etapa, recarregue, avance e volte. Abra a mesma nota sem `?trilha=` para conferir a leitura normal. Observe erros no console.

Limite desta sessão: o navegador integrado não estava disponível. Testes de DOM, build e contraste não substituem a conferência visual, o clipboard real, o console do navegador ou a troca de tema em um dispositivo real.

Validação executada na entrega: 38 testes Vitest e 8 testes Python passaram. O build gerou 90 páginas; a checagem confirmou as 71 notas existentes, 2.878 links internos, imagens, downloads e contraste nos dois temas. A preferência inicial de aparência foi testada com o script nativo do VitePress em uma simulação de DOM (sistema claro/escuro e preferências salvas), e a presença dos botões de copiar código foi verificada no HTML gerado. A interação manual com esses controles permanece na lista de conferência visual acima.
