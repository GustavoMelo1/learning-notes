---
name: design-direction
description: Direção visual "caderno de estudos" do Learning Notes. Use sempre que for criar ou alterar interface, CSS, componentes Vue do tema ou layout de páginas do site.
---

# Direção: caderno de estudos

O Learning Notes é o caderno de alguém que está aprendendo de verdade: anotado, grifado, com erros corrigidos à mão. A interface deve parecer **um caderno bem cuidado**, não um SaaS nem um template de documentação. Nada de skeuomorfismo pesado (sem textura de papel amassado, sem espiral): é a *linguagem* do caderno — grifo, margem, anotação, pauta — aplicada com rigor tipográfico.

## Tipografia

- **Títulos:** serifa editorial com personalidade — `Fraunces` (variável, use `opsz` e `SOFT`) via `@fontsource-variable/fraunces`.
- **Texto corrido:** serifa ou sans de leitura confortável — `Source Serif 4` ou `Atkinson Hyperlegible`. Corpo 17–18px, linha ~1.7, medida 65–72 caracteres.
- **Anotações de margem / rótulos:** uma manuscrita contida, usada com parcimônia — `Caveat` ou `Kalam`. Só para comentários, dicas, "erros que cometi". Nunca em botões ou navegação.
- **Código:** `JetBrains Mono`.
- Fontes auto-hospedadas via Fontsource; nunca Google Fonts em runtime.

## Cor

- Fundo papel quente (ex.: `#fbf8f1`), texto tinta (ex.: `#1f1d1a`), nada de cinza puro.
- **Uma** cor de destaque tipo marca-texto (amarelo `#ffe066` ou verde-limão) usada como grifo atrás de texto, não como cor de botão.
- Uma cor de "caneta" para links e ações (azul tinta `#2b4acb` ou vermelho correção `#c8402e` para erros/feedback).
- Modo escuro = caderno à noite: fundo `#1a1816`, grifo dessaturado, nunca preto puro.
- Tokens em `.frontend/app/assets/css/tokens.css` (`--paper`, `--ink`, `--pen`, `--marker`, `--red`); mantenha `:root` e `:root.dark` sincronizados. `check:site` reprova contraste abaixo de 4,5:1.

## Elementos de assinatura

- **Grifo:** destaque de termos-chave com fundo de marca-texto levemente irregular (`rough-notation` para animar ao entrar na tela, respeitando `prefers-reduced-motion`).
- **Margem:** em telas largas, anotações e dicas vivem numa coluna de margem à direita (como nota lateral), não em caixas coloridas no meio do texto.
- **Pauta/grade sutil** só em áreas de exercício (labs), sinalizando "aqui você pratica".
- **Checkmarks feitos à mão** (traço `roughjs` ou SVG desenhado) para etapas concluídas.
- Diagramas com traço à mão (`roughjs`) em vez de caixas perfeitas.

## Proibido (padrão genérico de IA)

- Inter/system-ui como identidade; paleta só de cinzas
- eyebrow em caixa alta acima de todo título
- seta `→` em todo link
- grid de cards idênticos com borda 1px
- seção "01 / 02 / 03 como funciona"
- hero com frase motivacional genérica
- gradientes, glassmorphism, sombras difusas grandes
- mais de uma ação primária por tela

## Produto

- Toda tela tem **uma** ação principal. Na home, para quem já estudou, ela é "Continuar: <próxima etapa>".
- Labs são ativos: o usuário tenta antes de ver a resposta (sql.js/PGlite para SQL, Pyodide para Python, CodeMirror 6 como editor).
- Todo o texto da interface em pt-BR, tom direto e em segunda pessoa ("você").
- Acessibilidade não é negociável: contraste AA, foco visível, `prefers-reduced-motion`, alvos de toque ≥ 44px.

## Verificação

Depois de mudar a interface, gere screenshots com `.claude/scripts/screenshots.mjs`, olhe para eles e rode o subagent `ui-critic`. Rode `npm.cmd test`, `npm.cmd run build` e `npm.cmd run check:site` em `.frontend/`.
