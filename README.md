# Learning Notes

🔗 [gustavomelo1.github.io/learning-notes](https://gustavomelo1.github.io/learning-notes/)

Notes on what I'm studying, written in my own words.

I'm rebuilding my fundamentals (logic, SQL, Python) and this repo is where I document it. Notes are written by me, no copy-paste from tutorials. If something is here, it's because I typed it, ran it, or got it wrong first.

## Structure

```text
learning-notes/
├── bi/
│   ├── docs.md
│   ├── star-schema.md
│   └── qlikview/
│       ├── 00-asks.md
│       ├── 01-setanalysis.md
│       └── notes.md
├── mongodb/
│   ├── documentstructure.md
│   └── notes.md
├── python/
│   ├── pytest-notes.md
│   └── code/
│       └── 01-variables.py ... 13-objects.py
└── sql/
    └── 01-data-types.md ... 25-join.md
```

## How it works

Each folder has numbered notes (`01-basics.md`, `02-joins.md`...) with three sections: the concept in my own words, examples I wrote, and mistakes I made along the way. 

Notes start from the basics on purpose.

## Subject guides

The library teaches the subjects behind my existing experiments, with each project serving as an application:

- **[SQL applied to financial analysis](sql/aplicado/analise-financeira/index.md):** understand transactions, answer questions with SQL and compare rows with window functions.
- **[CSV and JSON in Python](python/libs/csv-json/index.md):** read files, normalize columns and validate an export using the standard library.
- **[Requests](python/libs/requests/index.md):** learn HTTP requests, responses and pagination, then collect repository data as an example.

The original `financial-analysis` and `data-engineering-studies` repositories remain unchanged. The library adds nine lessons with exercises, expected results and links back to the source. Downloadable examples use fictional data; the API exercise runs offline.

Find each guide under its subject in **Biblioteca**, or open **Guias** for the overview. Each starts with a simple concept and example before the three application lessons. Progress is optional and saved only in the current browser. Old lesson links lead to their new locations, and previously saved progress is preserved.

## Frontend development

```powershell
cd .frontend
npm.cmd ci
npm.cmd run docs:dev
npm.cmd test
npm.cmd run docs:build
npm.cmd run check:site
```

Exercise tests, from the repository root:

```powershell
python -B -m unittest discover -s .frontend/tests -p "test_*.py" -v
```

See [integration notes](docs/project-learning-integration.md) for source revisions, design decisions and verification limits.

