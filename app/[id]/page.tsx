export default function Jogo({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>ID recebido: {params.id}</h1>
    </div>
  );
}
