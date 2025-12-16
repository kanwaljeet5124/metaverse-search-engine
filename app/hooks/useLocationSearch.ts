import { useQuery } from "@tanstack/react-query";
import { searchLocations } from "~/services/apis/search.service";
import type { SearchResponse } from "~/types/ResponseTypes";
import type { Locations } from './../types/Locations';

export const useLocationSearch = (keyword: string, page: number) => {
    return useQuery<SearchResponse<Locations>>({
        queryKey: ["searchLocations", keyword, page],
        queryFn: () => searchLocations(keyword, page),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}