# Notes

## Tabelas
Sempre dar DROP TABLE na tabela depois de usar pra não ocupar memória desnecessária.

## QVD
Pra descobrir a origem de um QVD: abre o arquivo no Notepad++, o cabeçalho XML mostra de onde ele foi gerado.

## Autoconcatenação
O Qlik junta automaticamente dois LOADs que têm
exatamente os mesmos campos, jogando o segundo dentro
da tabela anterior e descartando o rótulo novo.

Não dá erro. A tabela simplesmente deixa de existir
com o nome que eu dei.

NOCONCATENATE força tabela separada.
Ctrl+T mostra o nome real das tabelas em memória.