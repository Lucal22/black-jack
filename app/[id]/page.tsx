"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { DBResponse } from "../context/interface";
import handleRound from "../services/round";

export default function Jogo({ params }: { params: { id: number } }) {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  async function handleButton() {
    const r: DBResponse = await handleRound(params.id);

    if (r.id !== -1) {
      router.replace(`/${params.id}/${r.id}`);
    } else {
      setError(r.message);
    }
  }
  return (
    <>
      <nav className="w-full">
        <ul className="flex w-full justify-around px-16 pb-4">
          <li>
            <button onClick={() => handleButton()} className="cursor-pointer">
              Jogar
            </button>
          </li>
          <li className="cursor-pointer">Loja</li>
          <li className="cursor-pointer">Histórico</li>
          <li className="cursor-pointer">Ranking</li>
        </ul>
        <h1>ID recebido: {params.id}</h1>
      </nav>
    </>
  );
}
