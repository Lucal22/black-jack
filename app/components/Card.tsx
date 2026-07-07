import Image from "next/image";

type CardType = {
  nome: string;
};

export default function Card({ nome }: CardType) {
  return (
    <>
      <Image
        src={`/assets/cards/${nome}.png`}
        alt={`${nome}`}
        width={100}
        height={145}
      />
    </>
  );
}
