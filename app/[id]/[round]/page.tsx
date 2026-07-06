"use client";

import { useParams, useRouter } from "next/navigation";
import {
  HandPalmIcon,
  CardsThreeIcon,
  XCircleIcon,
  ArrowFatRightIcon,
} from "@phosphor-icons/react";

import { Cartas, DBResponse } from "@/app/context/interface";
import { handleCartas, handleCartasIniciais } from "@/app/services/carta";
import { useEffect, useState } from "react";
import Card from "@/app/components/Card";
import {
  handleDobrarAposta,
  handleEncerrarRound,
  handleRound,
} from "@/app/services/round";
import sleep from "@/app/utils/sleep";

export default function Jogo() {
  const params = useParams<{
    id: string;
    round: string;
  }>();
  const id = parseInt(params.id);
  const round = parseInt(params.round);
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [cartasJogador, setCartasJogador] = useState<Cartas>([]);
  const [cartasDealer, setCartasDealer] = useState<Cartas>([]);
  const [disabled, setDisabled] = useState(false);
  const [disabled2x, setDisabled2x] = useState(false);
  const [resultado, setResultado] = useState<
    "Andamento" | "Vitória" | "Derrota"
  >("Andamento");

  const totalJogador = cartasJogador.reduce(
    (total, carta) => total + carta.valor,
    0,
  );

  const totalDealer = cartasDealer.reduce(
    (total, carta) => total + carta.valor,
    0,
  );

  useEffect(() => {
    async function carregarCartas() {
      const r = await handleCartasIniciais(round);
      if (r.cartas) {
        setCartasJogador(r.cartas.filter((carta) => carta.dono === "Jogador"));

        setCartasDealer(r.cartas.filter((carta) => carta.dono === "Dealer"));
      }

      console.log(r);
    }
    carregarCartas();
  }, [round]);

  async function handleButton() {
    const r: DBResponse = await handleRound(id);

    if (r.id !== -1) {
      router.replace(`/${id}/${r.id}`);
    } else {
      setError(r.message);
    }
  }

  async function handleNovaCarta(
    dono: "Jogador" | "Dealer",
  ): Promise<"Andamento" | "Vitória" | "Derrota"> {
    const r = await handleCartas(round, dono);
    const cartas = r.cartas;
    if (cartas && cartas[0] != undefined) {
      if (dono === "Jogador") {
        setCartasJogador((prev) => [...prev, cartas[0]]);
      } else {
        setCartasDealer((prev) => [...prev, cartas[0]]);
      }
      setResultado(cartas[0].resultado);
      return cartas[0].resultado;
    }
    return "Andamento";
  }

  async function handleCartaDealer() {
    setDisabled(true);
    let res = resultado;
    while (res == "Andamento") {
      await sleep(750);
      res = await handleNovaCarta("Dealer");
    }
    setDisabled(false);
  }
  async function encerraRodada() {
    await handleEncerrarRound(round);
    router.replace(`/${id}`);
  }

  async function dobrarAposta() {
    await handleDobrarAposta(round);
    await handleNovaCarta("Jogador");
    await handleCartaDealer();
  }

  return (
    <div className="flex flex-col relative gap-8 justify-center items-center w-full">
      <button
        className="absolute cursor-pointer top-2 left-2"
        onClick={() => encerraRodada()}
      >
        <XCircleIcon size={32} />
      </button>
      <div>
        <div className="w-full flex flex-col justify-center items-center pt-5">
          <p className="">Dealer</p>
        </div>
        <div className="flex gap-2.5 justify-center py-4">
          {cartasDealer.map((carta) => {
            return <Card key={carta.nome} nome={carta.nome} />;
          })}
        </div>
        <div className="flex w-full justify-center ">
          <p className="flex w-10 h-10 items-center justify-center border-2 border-gray-700 rounded-full">
            {totalDealer}
          </p>
        </div>
      </div>
      {resultado != "Andamento" ? (
        <div className="flex items-center gap-4">
          <button
            className=" cursor-pointer "
            onClick={() => router.replace(`/${id}`)}
          >
            <XCircleIcon size={32} />
          </button>
          <div>{resultado}</div>
          <button className=" cursor-pointer " onClick={() => handleButton()}>
            <ArrowFatRightIcon size={32} />
          </button>
        </div>
      ) : (
        <div>
          <p className="w-100 h-0.5 border-[0.5px] border-gray-400"></p>
        </div>
      )}
      {error && (
        <div className="bg-red-500 text-white p-2 rounded">{error}</div>
      )}

      <div>
        <div className="flex w-full justify-center ">
          <p className="flex w-10 h-10 items-center justify-center border-2 border-gray-700 rounded-full">
            {totalJogador}
          </p>
        </div>
        <div className="flex gap-2.5 justify-center py-4">
          {cartasJogador.map((carta) => {
            return <Card key={carta.nome} nome={carta.nome} />;
          })}
        </div>
        <div className="flex w-full justify-center gap-2.5 ">
          <button
            disabled={disabled || resultado != "Andamento"}
            onClick={() => {
              setDisabled(true);
              handleCartaDealer();
            }}
            className="flex w-10 h-10 bg-red-300 items-center justify-center border-2 border-gray-700 rounded-full cursor-pointer"
          >
            <HandPalmIcon color="red" size={32} />
          </button>
          <button
            disabled={disabled2x || resultado != "Andamento"}
            onClick={() => {
              setDisabled2x(true);
              dobrarAposta();
            }}
            className="flex w-10 h-10 bg-yellow-300 items-center justify-center border-2 border-gray-700 rounded-full cursor-pointer"
          >
            2X
          </button>
          <button
            disabled={disabled || resultado != "Andamento"}
            onClick={() => {
              setDisabled(true);
              handleNovaCarta("Jogador");
            }}
            className="flex w-10 h-10 bg-green-300 items-center  justify-center border-2 border-gray-700 rounded-full cursor-pointer"
          >
            <CardsThreeIcon color="green" size={32} />
          </button>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <p className="">Jogador</p>
        </div>
      </div>
    </div>
  );
}
