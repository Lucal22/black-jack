import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

import { GetDBSettings } from "../../libs/common";
import { Jogador, JogadorResponse } from "@/app/context/interface";

// 1. populate the connection parameters
const connectionParams = GetDBSettings();

export async function POST(request: Request) {
  const { login, senha } = await request.json();
  try {
    // connect to database
    const connection = await mysql.createConnection(connectionParams);

    const myQuery = `
  SELECT ID_jogador
  FROM jogador
  WHERE login = ? AND senha = ?
  `;
    // create a query to fetch data
    const [rows] = await connection.execute(myQuery, [login, senha]);
    await connection.end();

    // Checa se jogador já existe e faz o login
    const jogadores = rows as Jogador[];
    if (jogadores.length > 0) {
      // retorna ID do jogador logado
      return NextResponse.json({
        success: true,
        message: "Login realizado com sucesso",
        id: jogadores[0].ID_jogador,
      } as JogadorResponse);
    }
    return NextResponse.json({
      success: false,
      message: "Erro ao efetuar login",
      id: -1,
    } as JogadorResponse);
  } catch (err) {
    console.log("ERROR: API - ", (err as Error).message);

    const response = {
      error: (err as Error).message,

      returnedStatus: 200,
    };

    return NextResponse.json(response, { status: 200 });
  }
}
