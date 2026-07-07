import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

import { GetDBSettings } from "../../../libs/common";
import { Historicos, HistoricosResponse } from "@/app/context/interface";

// 1. populate the connection parameters
const connectionParams = GetDBSettings();

export async function POST(request: Request) {
  const { id } = await request.json();
  try {
    // connect to database
    const connection = await mysql.createConnection(connectionParams);

    const myQuery = `
    select rodada, jogador, pontos_jogador, dealer, pontos_dealer, resultado, apostado
     from vw_historico_jogador 
     where ID_jogador = ?
     order by rodada asc;
  `;
    // create a query to fetch data
    const [rows] = await connection.execute(myQuery, [id]);
    await connection.end();

    const historico = rows as Historicos;
    if (historico.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Histórico pego com sucesso",
        historico: historico,
      } as HistoricosResponse);
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
