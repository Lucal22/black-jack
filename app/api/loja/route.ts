import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

import { GetDBSettings } from "../../libs/common";
import { Produtos, ProdutosResponse } from "@/app/context/interface";

// 1. populate the connection parameters
const connectionParams = GetDBSettings();

export async function GET() {
  try {
    // connect to database
    const connection = await mysql.createConnection(connectionParams);

    const myQuery = `select * from loja`;

    // create a query to fetch data
    const [rows] = await connection.execute(myQuery);
    await connection.end();
    const produtos = rows as Produtos;
    if (produtos.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Produtos coletados com sucesso",
        produtos: produtos,
      } as ProdutosResponse);
    }
    return NextResponse.json({
      success: false,
      message: "Erro ao pegar produtos",
      produtos: [],
    } as ProdutosResponse);
  } catch (err) {
    console.log("ERROR: API - ", (err as Error).message);

    const response = {
      error: (err as Error).message,

      returnedStatus: 400,
    };

    return NextResponse.json(response, { status: 400 });
  }
}
