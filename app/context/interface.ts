export type Jogador = {
  ID_jogador: number;
};

export type JogadorResponse = {
  success: boolean;
  message: string;
  id?: number;
};

export type Rodada = {
  ID_rodada: number;
};

export type DBResponse = {
  success: boolean;
  message: string;
  id?: number;
};

export type Carta = {
  nome: string;
  dono: string;
  valor: number;
  resultado: "Andamento" | "Vitória" | "Derrota";
};

export type Cartas = Carta[];

export type CartasResponse = {
  message: string;
  cartas?: Cartas;
};

export type erroType = {
  error: string;
  returnStatus: number;
};
