export type Jogador = {
  ID_jogador: number;
};

export type JogadorResponse = {
  success: boolean;
  message: string;
  id?: number;
};

export type JogadorMenu = {
  login: string;
  saldo: number;
};

export type JogadorMenuResponse = {
  success: boolean;
  message: string;
  jogador: JogadorMenu;
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

export type Produto = {
  ID_Produto: number;
  Produto: string;
  Qtd: number;
  Valor: number;
};

export type Produtos = Produto[];

export type ProdutosResponse = {
  message: string;
  produtos?: Produtos;
};

export type erroType = {
  error: string;
  returnStatus: number;
};
