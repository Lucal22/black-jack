"use client";

import { Cartas } from "@/app/context/interface";
import { handleCartas, handleCartasIniciais } from "@/app/services/carta";
import { useEffect, useState } from "react";

export default function Jogo({ params }: { params: { id: number } }) {
  const [cartasJogador, setCartasJogador] = useState<Cartas>([]);
  const [cartasDealer, setCartasDealer] = useState<Cartas>([]);
  const [resultado, setResultado] = useState<
    "Andamento" | "Vitória" | "Derrota"
  >("Andamento");

  useEffect(() => {
    async function carregarCartas() {
      const r = await handleCartasIniciais(params.id);
      if (r.cartas) {
        setCartasJogador(r.cartas.filter((carta) => carta.dono === "Jogador"));

        setCartasDealer(r.cartas.filter((carta) => carta.dono === "Dealer"));
      }

      console.log(r);
    }
    carregarCartas();
  }, [params.id]);
  //setCartasJogador((prev) => [...prev, novaCarta]);
  async function handleNovaCarta() {
    const r = await handleCartas(params.id, "Jogador");
    const cartas = r.cartas;
    if (cartas && cartas[0] != undefined) {
      setCartasJogador((prev) => [...prev, cartas[0]]);
      setResultado(cartas[0].resultado);
    }
  }
  return (
    <div className="flex flex-col gap-50 justify-center items-center w-full">
      <div>Dealer</div>
      <div>
        <p>Jogador</p>
        {cartasJogador.map((carta, id) => {
          return (
            <div key={id}>
              <p>{carta.nome}</p>
              <p>{carta.valor}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
