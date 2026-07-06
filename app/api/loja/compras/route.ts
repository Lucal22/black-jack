import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

import { GetDBSettings } from "../../../libs/common";

// 1. populate the connection parameters
const connectionParams = GetDBSettings();

export async function POST(request: Request) {
  const { id_jogador, id_produto } = await request.json();
  try {
    // connect to database
    const connection = await mysql.createConnection(connectionParams);

    const myQuery = `call comprar_produto(?,?)`;

    // create a query to fetch data
    await connection.execute(myQuery, [id_jogador, id_produto]);
    await connection.end();
    return NextResponse.json({
      success: true,
      message: "Crédito adicionado com sucesso",
    });
  } catch (err) {
    console.log("ERROR: API - ", (err as Error).message);

    const response = {
      error: (err as Error).message,

      returnedStatus: 400,
    };

    return NextResponse.json(response, { status: 400 });
  }
}
