import { Button, Input } from "@heroui/react";
import { useSearchParams } from "react-router";
import Header from "~/modules/header";

export function Banner() {
  let [searchParams, setSearchParams] = useSearchParams();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const keyword = formData.get("search") as string;
    const params = new URLSearchParams(searchParams);
    if(keyword) {
      params.set("keyword", keyword);
    } else {
      params.delete("keyword");
    }
    setSearchParams(params);
  }
  return (
    <div className="w-full bg-blue-100">
      <Header />
      <div className="py-36 w-full flex flex-wrap items-center justify-center mx-auto max-w-7xl">
        <div className="w-full flex flex-wrap items-center justify-center">
          <h1 className="w-full text-5xl font-bold text-center uppercase">Multiverse Search Engine</h1>
          <p className="w-full text-center my-4 max-w-xl">One search bar. Endless universes. Find characters, locations, and episodes instantly from the Rick & Morty multiverse.</p>
        </div>
        <form onSubmit={submitSearch} className="w-full flex justify-center mt-6 px-4">
          <div className="max-w-lg flex flex-nowrap bg-white rounded-full gap-2 p-2 w-full">
            <Input
              color="default"
              isClearable
              defaultValue={searchParams.get("keyword") || ""}
              classNames={
                {
                  input: "",
                  inputWrapper: "bg-transparent shadow-none data-[hover=true]:bg-transparent data-[focus=true]:bg-transparent"
                }
              }
              name="search"
              placeholder="Search characters, locations, or episodes..."
              />
            <Button color="primary" variant="ghost" radius="full">Search</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
