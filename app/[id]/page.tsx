"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { DBResponse, erroType, JogadorMenu } from "../context/interface";
import { handleRound } from "../services/round";
import { handlePlayerData } from "../services/jogador";

export default function Jogo() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [player, setPlayer] = useState<JogadorMenu>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function carregarJogador() {
      try {
        const r = await handlePlayerData(parseInt(params.id));
        setPlayer(r);
      } catch (error) {
        setError((error as Error).message);
      }
    }
    carregarJogador();
  }, [params.id]);

  async function handleButton() {
    const r: DBResponse = await handleRound(parseInt(params.id));
    if (r.id != undefined) {
      if (r.id !== -1) {
        router.replace(`/${params.id}/${r.id}`);
      } else {
        setError(r.message);
      }
    } else {
      const msg = r as unknown as erroType;
      setError(msg.error);
    }
  }
  return (
    <div className="w-full">
      <nav>
        <ul className="flex w-full justify-around px-16 pb-4">
          <li>
            <button onClick={() => handleButton()} className="cursor-pointer">
              Jogar
            </button>
          </li>
          <li className="cursor-pointer">
            <button
              onClick={() => router.replace(`/${params.id}/loja`)}
              className="cursor-pointer"
            >
              Loja
            </button>
          </li>
          <li className="cursor-pointer">Histórico</li>
          <li className="cursor-pointer">Ranking</li>
        </ul>
        {error && (
          <div className="bg-red-500 w-fit text-white p-2 rounded">{error}</div>
        )}
      </nav>
      <p>Nome: {player?.login}</p>
      <p>Saldo: {player?.saldo}</p>
    </div>
  );
}
