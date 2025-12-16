import type { Characters, Info } from "./Characters"

export interface SuccessResponse<T>{
    status: true,
    results: T[],
    info: Info
}

export interface ErrorResponse{
    status: false,
    message: string | undefined
}

export type SearchResponse<T> = SuccessResponse<T> | ErrorResponse;
