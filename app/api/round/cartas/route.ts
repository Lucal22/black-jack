import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

import { GetDBSettings } from "../../../libs/common";
import { Cartas, CartasResponse } from "@/app/context/interface";

// 1. populate the connection parameters
const connectionParams = GetDBSettings();

export async function POST(request: Request) {
  const { id } = await request.json();
  try {
    // connect to database
    const connection = await mysql.createConnection(connectionParams);

    const myQuery = `
    select c.nome, c.valor, cr.dono
    from carta as c 
    join carta_rodada as cr 
    on c.ID_carta = cr.ID_carta 
    where cr.ID_rodada = ? 
  `;
    // create a query to fetch data
    const [rows] = await connection.execute(myQuery, [id]);
    await connection.end();

    const cartas = rows as Cartas;
    if (cartas.length > 0) {
      return NextResponse.json({
        message: "Cartas coletadas com sucesso",
        cartas: cartas,
      } as CartasResponse);
    }
    return NextResponse.json({
      success: false,
      message: "Erro ao pegar cartas",
      id: [],
    } as CartasResponse);
  } catch (err) {
    console.log("ERROR: API - ", (err as Error).message);

    const response = {
      error: (err as Error).message,

      returnedStatus: 200,
    };

    return NextResponse.json(response, { status: 200 });
  }
}
