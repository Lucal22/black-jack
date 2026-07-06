import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

import { GetDBSettings } from "../../../libs/common";
import { Rankings, RankingsResponse } from "@/app/context/interface";

// 1. populate the connection parameters
const connectionParams = GetDBSettings();

export async function GET() {
  try {
    // connect to database
    const connection = await mysql.createConnection(connectionParams);

    const myQuery = `
    select * from vw_ranking_jogadores
  `;
    // create a query to fetch data
    const [rows] = await connection.execute(myQuery);
    await connection.end();

    const ranking = rows as Rankings;
    if (ranking.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Histórico pego com sucesso",
        ranking: ranking,
      } as RankingsResponse);
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
