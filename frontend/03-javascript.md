---
title: JavaScript — uma busca simples
description: Conecta um campo de texto à lista de notas usando eventos e filtros.
---
# JavaScript — uma busca simples

JavaScript faz a página responder ao que tu faz. Na nossa minibiblioteca, digitar no campo de busca muda quais notas aparecem.

## Capturar o que foi digitado

Dentro do `main`, antes da seção de notas, adiciona:

```html
<label for="busca">Buscar nas notas</label>
<input id="busca" type="search" aria-controls="notas">
<p id="resultado" role="status"></p>
```

Antes de fechar `body`, adiciona:

```html
<script>
  const busca = document.querySelector('#busca');
  const notas = [...document.querySelectorAll('#notas li')];
  const resultado = document.querySelector('#resultado');
  const normalizar = texto => texto.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').toLowerCase();

  function filtrar() {
    const termo = normalizar(busca.value.trim());
    let visiveis = 0;
    for (const nota of notas) {
      const corresponde = normalizar(nota.textContent).includes(termo);
      nota.hidden = !corresponde;
      if (corresponde) visiveis++;
    }
    resultado.textContent = visiveis === 0
      ? 'Nenhuma nota encontrada. Tenta outro termo.'
      : `${visiveis} nota(s) encontrada(s).`;
  }
  busca.addEventListener('input', filtrar);
  filtrar();
</script>
```

`querySelector` encontra um elemento. O evento `input` chama a função quando o campo muda. A propriedade `hidden` esconde as notas que não combinam com o texto.

A função `normalizar` permite buscar “pagina” e encontrar “página”. Com o campo vazio, todas as notas reaparecem.

## Onde aparece no site

O Learning Notes usa a mesma ideia em `LibraryCatalog.vue`: combina texto digitado, assunto e tipo de conteúdo. Vue calcula a lista filtrada e atualiza a tela. Não precisa consultar um servidor a cada letra.

## Confere o comportamento

1. Digita `HTML`: deve sobrar uma nota.
2. Digita `pagina`: deve encontrar “estrutura da página”.
3. Digita `xyz`: deve aparecer a mensagem de nenhum resultado.
4. Apaga tudo: as duas notas devem voltar.

O [exemplo completo](./index#ver-o-resultado) junta HTML, CSS e essa busca em um arquivo.

Próximo: [como isso se conecta ao Vue e ao VitePress](./04-learning-notes).
