# Black Jack

Um projeto que simula uma partida de black jack para o trabalho de banco de dados I.

**Recursos principais:**

- ✅Veja o modelo conceitual do banco: [Modelo Conceitual](https://app.brmodeloweb.com/publicview/6a19a996f6f073bcc161cea1)
- ✅Veja o modelo Lógico do banco: [Modelo Lógico](https://app.brmodeloweb.com/publicview/6a3aab990f42235251e4c9c1)

# 📋 Visão Geral

## Objetivo

- Fazer uma mão com valor maior que a do dealer.
- Ou fazer o dealer ultrapassar 21 (“estourar”).
- Se você ultrapassar 21, perde automaticamente.

## Valores das cartas

- Cartas de 2 a 10 → valem o número delas.
- J, Q e K → valem 10.
- Ás (A) → vale 1.

## Exemplo

- K + 7 = 17
- A + 9 + 8 = 18

# Como começa a rodada

1. O jogador recebe 2 cartas.
2. O dealer também recebe 2 cartas:

# Ações do jogador

Depois de receber as cartas, você escolhe o que fazer:

- **Hit** → pedir mais uma carta.
- **Stand** → parar e manter a mão atual.
- **Double Down** → dobrar a aposta e receber apenas mais 1 carta.

# Regras do dealer

O dealer segue regras fixas:

- Deve pedir carta até pelo menos 17.
- Normalmente para em 17 ou mais.
