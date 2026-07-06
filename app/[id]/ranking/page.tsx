"use client";

import { Rankings } from "@/app/context/interface";
import { handleRanking } from "@/app/services/jogador";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Ranking() {
  const params = useParams<{ id: string }>();

  const [ranking, setRanking] = useState<Rankings>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function carregarRanking() {
      try {
        const r = await handleRanking();
        setRanking(r);
      } catch (error) {
        setError((error as Error).message);
      }
    }
    carregarRanking();
  }, [params.id]);

  return (
    <div className="w-full overflow-x-auto">
      {error && (
        <div className="bg-red-500 w-fit text-white p-2 rounded">{error}</div>
      )}
      {ranking.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b font-bold">
              <th className="p-2 text-left">Jogador</th>
              <th className="p-2 text-left">Vitórias</th>
              <th className="p-2 text-center">Derrotas</th>
              <th className="p-2 text-left">Empates</th>
              <th className="p-2 text-center">Total</th>
            </tr>
          </thead>

          <tbody>
            {ranking.map((r) => (
              <tr key={r.jogador} className="border-b">
                <td className="p-2">{r.jogador}</td>
                <td className="p-2">{r.vitorias}</td>
                <td className="p-2 text-center">{r.derrotas}</td>
                <td className="p-2  text-center">{r.empates}</td>
                <td className="p-2  text-center">{r.total_jogos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </div>
  );
}
