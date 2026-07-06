"use client";

import { Produtos } from "@/app/context/interface";
import { handleComprarProduto, handleProdutos } from "@/app/services/produto";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Loja() {
  const params = useParams<{ id: string }>();

  const [produtos, setProdutos] = useState<Produtos>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const r = await handleProdutos();
        setProdutos(r);
      } catch (error) {
        setError((error as Error).message);
      }
    }
    carregarProdutos();
  }, []);

  async function comprarProduto(id: number) {
    await handleComprarProduto(parseInt(params.id), id);
  }

  return (
    <div className="relative w-full">
      {error && (
        <div className="bg-red-500 w-fit text-white p-2 rounded">{error}</div>
      )}
      <nav className="w-full pt-10">
        <ul className="grid grid-cols-[3fr_1fr_1fr_1fr] gap-4 border-b pb-4 font-bold">
          <li>Produto</li>
          <li className="text-center">Qtd</li>
          <li className="text-right">Valor</li>
          <li className="text-center">Ação</li>
        </ul>

        {produtos.map((p) => (
          <ul
            key={p.ID_Produto}
            className="grid grid-cols-[3fr_1fr_1fr_1fr] gap-4 py-2 border-b items-center"
          >
            <li>{p.Produto}</li>

            <li className="text-center">{p.Qtd}</li>

            <li className="text-right">R$ {Number(p.Valor).toFixed(2)}</li>

            <li className="flex justify-center">
              <button
                className="px-3 py-1 rounded border cursor-pointer hover:bg-zinc-100"
                onClick={() => comprarProduto(p.ID_Produto)}
              >
                Comprar
              </button>
            </li>
          </ul>
        ))}
      </nav>
    </div>
  );
}
