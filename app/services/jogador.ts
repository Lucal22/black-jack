export async function handlePlayerData(id: number) {
  const response = await fetch("../api/dados/jogador", {
    method: "POST",
    body: JSON.stringify({
      id: id,
    }),
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || "Não foi possível pegar os dados do jogador");
  }

  return data.jogador;
}

export async function handleHistorico(id: number) {
  const response = await fetch("../api/dados/historico", {
    method: "POST",
    body: JSON.stringify({
      id: id,
    }),
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(
      data.error || "Não foi possível pegar os dados das partidas",
    );
  }

  return data.historico;
}

export async function handleRanking() {
  const response = await fetch("../api/dados/ranking", {
    method: "GET",
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(
      data.error || "Não foi possível pegar os dados das partidas",
    );
  }

  return data.ranking;
}
