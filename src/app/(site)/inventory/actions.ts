"use server";

import { client } from "@/sanity/client";
import {
  EXPERIMENTAL_getBoardGamesPaginated,
  EXPERIMENTAL_getTotalBoardGames,
} from "@/sanity/lib/queries";

export async function fetchGames(
  page: number,
  limit: number,
  searchQuery: string = "",
) {
  const start = (page - 1) * limit;
  const end = start + limit;

  const games = await client.fetch(EXPERIMENTAL_getBoardGamesPaginated, {
    start,
    end,
    searchQuery,
  });

  return games;
}

export async function fetchTotalGames(searchQuery: string = "") {
  const total = await client.fetch(EXPERIMENTAL_getTotalBoardGames, {
    searchQuery,
  });
  return total;
}
