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

## Practice paths

The site also turns my existing experiments into guided learning paths:

- **Financial analysis:** understand transactions, answer questions with SQL and compare rows with window functions.
- **File pipeline:** read CSV/JSON, normalize columns and validate an export.
- **Repository API:** understand responses, paginate and build a table without hiding failures.

The original `financial-analysis` and `data-engineering-studies` repositories remain unchanged. The library adds nine lessons with exercises, expected results and links back to the source. Downloadable examples use fictional data; the API exercise runs offline.

Open **Prática** in the site to follow a path. Progress is optional and saved only in the current browser. **Biblioteca** searches both notes and practical lessons.

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

