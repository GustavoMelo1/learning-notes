# 24 - ACID

ACID é o conjunto de 4 garantias que uma engine séria (tipo InnoDB) precisa cumprir numa transação. Pra ficar concreto, vou usar sempre o mesmo exemplo: **transferir R$100 da conta do João pra conta da Maria.**

- **Atomicidade** → ou faz TUDO, ou não faz NADA. Debitar do João e creditar na Maria é uma operação só. Se debitar e o sistema cair antes de creditar, a transação inteira é desfeita.
- **Consistência** → o banco sai de um estado válido e cai em outro estado válido. Se existe uma regra tipo "saldo não pode ficar negativo", a transação não pode quebrar essa regra.
- **Isolamento** → transações ao mesmo tempo não enxergam o "meio do caminho" uma da outra. Se outra pessoa consultar o saldo do João no meio da transferência, ela vê o saldo ANTES ou DEPOIS da operação completa, nunca um estado quebrado.
- **Durabilidade** → depois que a transação termina (`COMMIT`), o dado tá salvo de verdade. Mesmo que o servidor caia um segundo depois, a transferência não se perde.

## Quais engines suportam ACID
- `InnoDB` → sim, todas as 4 garantias.
- `MyISAM` → não, não tem transação nem isolamento de verdade.
