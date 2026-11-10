---
title: HTML — estrutura e significado
description: Organiza uma página com título, navegação, conteúdo e links antes de pensar no visual.
---
# HTML — estrutura e significado

HTML marca o que cada pedaço do conteúdo significa. Um título usa `h1`; um parágrafo usa `p`; um link usa `a`.

## Uma primeira página

Salva como `index.html` e abre no navegador:

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Minha biblioteca</title>
  </head>
  <body>
    <header>
      <nav aria-label="Principal"><a href="#notas">Ver notas</a></nav>
    </header>
    <main>
      <h1>Minha biblioteca</h1>
      <p>Um lugar para guardar o que estou aprendendo.</p>
      <section id="notas" aria-labelledby="titulo-notas">
        <h2 id="titulo-notas">Notas de estudo</h2>
        <ul>
          <li>HTML: estrutura da página</li>
          <li>CSS: cores e espaçamento</li>
        </ul>
      </section>
    </main>
  </body>
</html>
```

Resultado: um título, uma descrição e duas notas. O link “Ver notas” leva à seção identificada por `id="notas"`.

## Por que essas tags?

- `header` reúne a abertura da página; `nav` identifica a navegação.
- `main` contém o conteúdo principal.
- `h1` e `h2` organizam os títulos em níveis.
- `ul` e `li` expressam uma lista, mesmo antes do CSS.

Usa link para navegar e botão para executar uma ação. Isso já ajuda quem navega pelo teclado.

## Onde aparece no Learning Notes

A página Biblioteca tem um formulário de busca, uma lista de notas e links para abrir cada conteúdo. Essa estrutura está no template de `LibraryCatalog.vue`. Vue acrescenta comportamento, mas a base continua sendo HTML.

## Tenta tu

Adiciona uma terceira nota sobre SQL. Depois usa Tab e Enter para acessar “Ver notas”. O texto deve continuar compreensível sem nenhum estilo.

Referência: [introdução ao HTML na MDN](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax).

Próximo: [dar aparência à página com CSS](./02-css).
