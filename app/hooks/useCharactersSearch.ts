import { useQuery } from "@tanstack/react-query";
import { searchCharacters } from "~/services/apis/search.service";
import type { SearchResponse } from "~/types/ResponseTypes";
import type { Characters } from "~/types/Characters";

export const useCharactersSearch = (keyword: string, page: number) => {
    return useQuery<SearchResponse<Characters>>({
        queryKey: ["searchCharacters", keyword, page],
        queryFn: () => searchCharacters(keyword, page),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}