import { Card, CardBody, CardFooter, Chip, Image, Pagination } from '@heroui/react'
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router';
import { useCharactersSearch } from '~/hooks/useCharactersSearch';
import CardSkeleton from './CardSkeleton';

export default function Characters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const page = Number(searchParams.get("page")) || 1;
  const {data, isLoading, error} = useCharactersSearch(keyword, page as number);

  console.log("Characters Component Rendered with:", { keyword, page });
  const paginationHandler = (page: number) => {
    console.log("Page changed to:", page);
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params);
  }

  return (
    <div className='flex flex-wrap w-full items-center justify-between'>
      <div className="w-full grid grid-cols-5 gap-5 items-stretch justify-center mt-4 mb-10">
        {!isLoading && data?.status && data.results.map((item, index) => <Card className='items-start' key={item.name + index}>
            <CardBody className="overflow-visible p-0 flex-none">
              <Image 
                alt={item.name}
                className="w-full h-auto"
                src={item.image}
                radius="none"
                width="100%"
              />
            </CardBody>
            <CardFooter className="flex flex-wrap ">
              {item.status.toLowerCase() === "alive" && <Chip size="sm" color="success" variant="dot" className="capitalize text-zinc-400 font-bold">{`${item.status} - ${item.species}`}</Chip>}
              {item.status.toLowerCase() === "dead" && <Chip size="sm" color="danger" variant="dot" className="capitalize text-zinc-400 font-bold">{`${item.status} - ${item.species}`}</Chip>}
              {item.status.toLowerCase() === "unknown" && <Chip size="sm" color="warning" variant="dot" className="capitalize text-zinc-400 font-bold">{`${item.status} - ${item.species}`}</Chip>}
              <h3 className="w-full text-lg font-bold mt-1">{item.name}</h3>
            </CardFooter>
        </Card>)}
        {isLoading && Array(5).fill(null).map((_, i)=> <CardSkeleton key={i} />)}
      </div>
      <div className='w-full flex flex-wrap items-center justify-center'>
        <Pagination showControls page={page as number} total={data?data.status?data.info.count:0:0} color='primary' onChange={paginationHandler} />
      </div>
    </div>
  )
}
