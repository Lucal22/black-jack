"use client";

import { Historicos } from "@/app/context/interface";
import { handleHistorico } from "@/app/services/jogador";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Historico() {
  const params = useParams<{ id: string }>();

  const [historico, setHistorico] = useState<Historicos>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function carregarHistorico() {
      try {
        const r = await handleHistorico(parseInt(params.id));
        setHistorico(r);
      } catch (error) {
        setError((error as Error).message);
      }
    }
    carregarHistorico();
  }, [params.id]);

  return (
    <div className="w-full overflow-x-auto">
      {error && (
        <div className="bg-red-500 w-fit text-white p-2 rounded">{error}</div>
      )}
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b font-bold">
            <th className="p-2 text-left">Rodada</th>
            <th className="p-2 text-left">Jogador</th>
            <th className="p-2 text-center">Pts Jogador</th>
            <th className="p-2 text-left">Dealer</th>
            <th className="p-2 text-center">Pts Dealer</th>
            <th className="p-2 text-center">Resultado</th>
            <th className="p-2 text-right">Apostado</th>
          </tr>
        </thead>

        <tbody>
          {historico.length > 0
            ? historico.map((h) => (
                <tr key={h.rodada} className="border-b">
                  <td className="p-2">{h.rodada}</td>
                  <td className="p-2">{h.jogador}</td>
                  <td className="p-2 text-center">{h.pontos_jogador}</td>
                  <td className="p-2">{h.dealer}</td>
                  <td className="p-2 text-center">{h.pontos_dealer}</td>
                  <td className="p-2 text-center">{h.resultado}</td>
                  <td className="p-2 text-right">R$ {h.apostado}</td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </div>
  );
}
