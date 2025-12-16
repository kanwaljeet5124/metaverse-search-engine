import { URL, responseValidator, apiError } from "../helpers";
import type {CharactersResponse, Characters}  from "../../types/Characters";
import type { LocationsResponse, Locations } from "../../types/Locations";
import type { SearchResponse } from "../../types/ResponseTypes";
import type { Episodes, EpisodesResponse } from "~/types/Episodes";

const requestOptions: RequestInit = {
  method: "GET",
  headers: new Headers(),
  redirect: "follow",
};

export const searchCharacters = async (keyword: string = "", page: number=1): Promise<SearchResponse<Characters>> => {
  try {
    const response = await fetch(`${URL}/character/?name=${keyword}&page=${page}`, requestOptions);
    const res = await responseValidator<CharactersResponse>(response);
    return {
      status: true,
      results: res.results ?? [],
      info: res.info || { count: 0, pages: 0, next: null, prev: null },
    };
  } catch (e) {
    return apiError(e);
  }
};

export const searchLocations = async (keyword: string = "", page: number=1): Promise<SearchResponse <Locations>> => {
  try {
    const response = await fetch(`${URL}/location/?name=${keyword}&page=${page}`, requestOptions);
    const res = await responseValidator<LocationsResponse>(response);
    return {
      status: true,
      results: res.results ?? [],
      info: res.info || { count: 0, pages: 0, next: null, prev: null },
    };
  } catch (e) {
    return apiError(e);
  }
};

export const searchEpisodes = async (keyword: string = "", page: number=1): Promise<SearchResponse <Episodes>> => {
  try {
    const response = await fetch(`${URL}/episode/?name=${keyword}&page=${page}`, requestOptions);
    const res = await responseValidator<EpisodesResponse>(response);
    return {
      status: true,
      results: res.results ?? [],
      info: res.info || { count: 0, pages: 0, next: null, prev: null },
    };
  } catch (e) {
    return apiError(e);
  }
};