import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Pagination} from "@heroui/react";
import { useSearchParams } from "react-router";
import CardSkeleton from "./CardSkeleton";
import { useEpisodeSearch } from "~/hooks/useEpisodeSearch";

export default function Episodes() {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";
    const page = Number(searchParams.get("page")) || 1;
    const {data, isLoading, error} = useEpisodeSearch(keyword, page as number);
    const paginationHandler = (page: number) => {
        console.log("Page changed to:", page);
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        setSearchParams(params);
    }
    return (
        <div className="w-full flex flex-wrap items-center justify-center">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 items-center justify-center mt-4 mb-10">
                {!isLoading && data?.status && data.results.map((item, index) => <Card key={item.name + index} className="max-w-[400px]">
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                            <p className="text-md">{item.name}</p>
                            <p className="text-small text-default-500">{item.episode}</p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <p className="text-sm">There are {item.characters.length} characters in this episode.</p>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <p className="text-sm"><b>Air on: </b>{item.air_date}</p>
                    </CardFooter>
                </Card>)}

                { isLoading && Array(3).fill(null).map((_, i)=> <CardSkeleton key={i} variant={1} />)}
            </div>

            {!isLoading && data?.status && data.results.length === 0 && (
                <p className="w-full text-center text-lg">No locations found.</p>
            )
            }
            {!isLoading && !data?.status && (
                <div className="w-full flex flex-col items-center justify-center">
                    <p className="text-lg mb-4 font-bold">No Data Found</p>
                </div>
            )}
            {data?.status && data.info.count > 0 && <div className='w-full flex flex-wrap items-center justify-center'>
                <Pagination showControls page={page as number} total={data?data.status?data.info.count:0:0} color='primary' onChange={paginationHandler} />
            </div>}
        </div>
    );
}
