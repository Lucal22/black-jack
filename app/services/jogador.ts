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
