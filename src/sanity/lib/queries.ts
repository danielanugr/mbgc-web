import { defineQuery } from "next-sanity";

// BoardGames Queries
export const EXPERIMENTAL_getAllBoardGames = defineQuery(`
  *[_type == "boardGame"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    publisher,
    coverImage,
    imageUrl,
    bggRating,
    bggId
  }
`);

export const EXPERIMENTAL_getBoardGameBySlug = defineQuery(`
  *[_type == "boardGame" && slug.current == $slug][0] {
    _id,
    name,
    publisher,
    coverImage,
    imageUrl,
    bggRating,
    bggId
  }
`);

// Playday Event Queries
export const EXPERIMENTAL_getUpcomingEvents = defineQuery(`
  *[_type == "event" && date >= now()] | order(date asc) {
    _id,
    title,
    "slug": slug.current,
    date,
    location,
    image,
    description
  }
`);

export const EXPERIMENTAL_getAllEvents = defineQuery(`
  *[_type == "event"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    date,
    location,
    image
  }
`);

export const EXPERIMENTAL_getEventBySlug = defineQuery(`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    date,
    location,
    description,
    image
  }
`);
