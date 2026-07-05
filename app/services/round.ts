import { DBResponse } from "../context/interface";

export default async function handleRound(
  jogadorId: number,
): Promise<DBResponse> {
  const response = await fetch("../api/round", {
    method: "POST",
    body: JSON.stringify({
      id: jogadorId,
    }),
  });
  const data = await response.json();
  return data;
}
