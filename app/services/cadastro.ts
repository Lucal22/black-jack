import { JogadorResponse } from "../context/interface";

export default async function handleCadastro(
  jogadorLogin: string,
  jogadorSenha: string,
): Promise<JogadorResponse> {
  const response = await fetch("/api/cadastro", {
    method: "POST",
    body: JSON.stringify({
      login: jogadorLogin,
      senha: jogadorSenha,
    }),
  });
  const data = await response.json();
  return data;
}
