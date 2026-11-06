# Projetos como percursos de aprendizado

## Escopo

Somente Learning Notes foi alterado. `daily-routine-app` foi citado como referência de usabilidade e permaneceu fora do escopo após confirmação do usuário.

Os repositórios originais continuam independentes. A integração é editorial: seus problemas, trechos e decisões viraram etapas de estudo, com links para a origem e exercícios separados. Não há sincronização automática nem cópia de dados pessoais.

## Origem e adaptação

| Projeto | Revisão local consultada | Percurso |
| --- | --- | --- |
| data-engineering-studies | `3880977fad4edb644e066eb316b81318a22cfeef` | Dois arquivos, uma linguagem; Da API à tabela |
| financial-analysis | `76c8330a7e0efa1bcb7a93b200aac633e6d6f700` | Para onde foi o dinheiro? |

Os exercícios financeiros têm dados fictícios criados para a trilha. O `sample_data.sql` original estava praticamente vazio, por isso não foi apresentado como um exercício pronto. Não foi lido nem importado `data.sql` com lançamentos pessoais.

O pipeline original está numa etapa de refatoração: acesso a atributo numa lista, nomes de campos específicos e partes comentadas. A trilha explicita esses pontos. O exercício baixável é uma adaptação pequena, executável e testada, não uma substituição silenciosa do código original.

O exercício de API roda offline. Valida formato, nomes, limite de páginas e propagação de falhas. Não usa token nem dispara requisições. Para a integração real, as notas remetem à documentação do GitHub.

## Organização da interface

| Antes | Depois | Motivo |
| --- | --- | --- |
| Apresentação grande e catálogo em cartões | Introdução pessoal curta e índice em linhas | Facilitar leitura e comparação sem excesso de contornos |
| Projetos em repositórios separados | Prática com 3 percursos e 9 etapas | Dar contexto, sequência e critério de conclusão |
| Notas e exercícios sem distinção no catálogo | Busca por assunto e filtro Anotações/Prática | Encontrar o formato útil para a tarefa |
| Navegação de documento genérica | Contexto da etapa, anterior/próxima e progresso opcional | Ajudar a retomar o estudo |

Princípios aplicados das referências pedidas: animação com propósito, feedback breve, navegação de teclado sem movimentos, redução de movimento, foco visível e testes de comportamento com componentes reais. Não houve cópia da aparência dos sites de referência.

- [Emil Kowalski — Design Engineering](https://www.ui-skills.com/skills/emilkowalski/emil-design-eng)
- [Frontend Testing Expert](https://mcpmarket.com/tools/skills/frontend-testing-expert)

O projeto é Vue/VitePress, portanto foi usada Testing Library para Vue, com Vitest. O site não tem API de escrita, exclusão de conteúdo ou formulários remotos: os testes cobrem as falhas que existem aqui (armazenamento local, respostas simuladas no exercício de API e estados vazios), sem criar recursos de exclusão só para testá-los.

## Verificações

```powershell
cd .frontend
npm.cmd test
npm.cmd run docs:build
npm.cmd run check:site
```

Na raiz, com Python disponível:

```powershell
python -B -m unittest discover -s .frontend/tests -p "test_*.py" -v
```

Os testes usam bancos SQLite em memória, arquivos temporários e respostas simuladas. Não modificam os projetos de origem. A verificação do site examina links internos e os downloads do build.

Limite de validação desta entrega: o navegador integrado da sessão não estava disponível. A aparência final em desktop/celular e a navegação visual devem ser revisadas em navegador; os testes de DOM não substituem essa conferência.
