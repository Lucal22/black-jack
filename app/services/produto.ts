export async function handleProdutos() {
  const response = await fetch("../api/loja", {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || "Não foi possível pegar os produtos");
  }

  return data.produtos;
}

export async function handleComprarProduto(
  id_jogador: number,
  id_produto: number,
) {
  const response = await fetch("../api/loja/compras", {
    method: "POST",
    body: JSON.stringify({
      id_jogador: id_jogador,
      id_produto: id_produto,
    }),
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || "Não foi possível pegar os produtos");
  }

  return data;
}
