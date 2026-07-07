import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

import { GetDBSettings } from "../../../libs/common";
import { Cartas, CartasResponse } from "@/app/context/interface";

// 1. populate the connection parameters
const connectionParams = GetDBSettings();

export async function POST(request: Request) {
  const { id, dono } = await request.json();
  try {
    // connect to database
    const connection = await mysql.createConnection(connectionParams);

    const myQuery = `call joga_carta(?,?)`;
    await connection.execute(myQuery, [id, dono]);

    const myQuery2 = `
    select c.nome, c.valor, cr.dono, r.resultado
    from carta as c 
    join carta_rodada as cr 
    on c.ID_carta = cr.ID_carta 
    join rodada  as r 
    on r.ID_rodada = cr.ID_rodada
    where cr.ID_rodada = ? 
    order by data_insercao desc limit 1;
  `;
    // create a query to fetch data
    const [rows] = await connection.execute(myQuery2, [id]);
    await connection.end();

    const cartas = rows as Cartas;
    if (cartas.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Carta coletada com sucesso",
        cartas: cartas,
      } as CartasResponse);
    }
    return NextResponse.json({
      success: false,
      message: "Erro ao pegar carta",
      id: [],
    } as CartasResponse);
  } catch (err) {
    console.log("ERROR: API - ", (err as Error).message);

    const response = {
      error: (err as Error).message,

      returnedStatus: 400,
    };

    return NextResponse.json(response, { status: 400 });
  }
}
