import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

import { GetDBSettings } from "../../libs/common";
import { DBResponse, Rodada } from "@/app/context/interface";

// 1. populate the connection parameters
const connectionParams = GetDBSettings();

export async function POST(request: Request) {
  const { id } = await request.json();
  try {
    // connect to database
    const connection = await mysql.createConnection(connectionParams);

    const myQuery = `
    call iniciar_rodada(?)
  `;
    // create a query to fetch data
    const [rows] = await connection.execute(myQuery, [id]);

    await connection.end();
    // Checa se jogador já existe e faz o login
    const rodada = rows as Rodada[];
    if (rodada.length > 0) {
      // retorna ID do jogador logado
      return NextResponse.json({
        success: true,
        message: "Rodada criada com sucesso",
        id: rodada[0].ID_rodada,
      } as DBResponse);
    }
    return NextResponse.json({
      success: false,
      message: "Erro ao criar rodada",
      id: -1,
    } as DBResponse);
  } catch (err) {
    console.log("ERROR: API - ", (err as Error).message);

    const response = {
      error: (err as Error).message,

      returnedStatus: 200,
    };

    return NextResponse.json(response, { status: 200 });
  }
}
