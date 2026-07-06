import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

import { GetDBSettings } from "../../../libs/common";
import { JogadorMenu, JogadorMenuResponse } from "@/app/context/interface";

// 1. populate the connection parameters
const connectionParams = GetDBSettings();

export async function POST(request: Request) {
  const { id } = await request.json();
  try {
    // connect to database
    const connection = await mysql.createConnection(connectionParams);

    const myQuery = `
  SELECT j.login, c.saldo
  FROM jogador as j 
  join carteira as c 
  on c.id_jogador = j.id_jogador
  WHERE j.id_jogador = ?
  `;
    // create a query to fetch data
    const [rows] = await connection.execute(myQuery, [id]);
    await connection.end();

    const jogador = rows as JogadorMenu[];
    if (jogador.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Cadastro realizado com sucesso",
        jogador: jogador[0],
      } as JogadorMenuResponse);
    }
  } catch (err) {
    console.log("ERROR: API - ", (err as Error).message);

    const response = {
      success: false,
      error: (err as Error).message,

      returnedStatus: 400,
    };

    return NextResponse.json(response, { status: 400 });
  }
}
