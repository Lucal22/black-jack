import { DBResponse } from "../context/interface";

export async function handleRound(jogadorId: number): Promise<DBResponse> {
  const response = await fetch("../api/round", {
    method: "POST",
    body: JSON.stringify({
      id: jogadorId,
    }),
  });
  const data = await response.json();
  return data;
}

export async function handleEncerrarRound(jogadorId: number) {
  await fetch("../api/round/encerrar", {
    method: "POST",
    body: JSON.stringify({
      id: jogadorId,
    }),
  });
}

export async function handleDobrarAposta(jogadorId: number) {
  await fetch("../api/round/dobrar", {
    method: "POST",
    body: JSON.stringify({
      id: jogadorId,
    }),
  });
}
