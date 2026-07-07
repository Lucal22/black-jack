import { CartasResponse } from "../context/interface";

export async function handleCartasIniciais(
  roundID: number,
): Promise<CartasResponse> {
  const response = await fetch("../api/round/cartas", {
    method: "POST",
    body: JSON.stringify({
      id: roundID,
    }),
  });
  const data = await response.json();
  return data;
}

export async function handleCartas(
  roundID: number,
  dono: "Jogador" | "Dealer",
): Promise<CartasResponse> {
  const response = await fetch("../api/round/carta", {
    method: "POST",
    body: JSON.stringify({
      id: roundID,
      dono: dono,
    }),
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || "Não foi possível adicionar a carta");
  }

  return data;
}
