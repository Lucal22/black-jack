"use client";

import { Produtos } from "@/app/context/interface";
import { handleComprarProduto, handleProdutos } from "@/app/services/produto";
import { XCircleIcon } from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Loja() {
  const router = useRouter();
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
      <button
        className="absolute cursor-pointer top-2 left-2"
        onClick={() => router.replace(`/${params.id}`)}
      >
        <XCircleIcon size={32} />
      </button>
      <div className="flex items-center justify-center">
        <h1>LOJA</h1>
      </div>
      {error && (
        <div className="bg-red-500 w-fit text-white p-2 rounded">{error}</div>
      )}
      <nav className="w-full pt-10">
        <ul className="grid grid-cols-3 gap-4 border-b pb-4 font-bold">
          <li>Produto</li>
          <li className="text-center">Qtd</li>
          <li className="text-right">Valor</li>
        </ul>

        {produtos.map((p) => (
          <ul
            key={p.ID_Produto}
            className="grid grid-cols-3 gap-4 py-2 border-b"
          >
            <li>{p.Produto}</li>
            <li className="text-center">{p.Qtd}</li>
            <li className="text-right">R$ {Number(p.Valor).toFixed(2)}</li>
            <li>
              <button
                className="cursor-pointer"
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
