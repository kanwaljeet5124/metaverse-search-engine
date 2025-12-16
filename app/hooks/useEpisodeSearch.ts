import { useQuery } from "@tanstack/react-query";
import { searchEpisodes } from "~/services/apis/search.service";
import type { Episodes } from "~/types/Episodes";
import type { SearchResponse } from "~/types/ResponseTypes";

export const useEpisodeSearch = (keyword: string, page: number) => {
    return useQuery<SearchResponse<Episodes>>({
        queryKey: ["searchEpisodes", keyword, page],
        queryFn: () => searchEpisodes(keyword, page),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}   