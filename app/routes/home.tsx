import type { Route } from "./+types/home";
import { Banner } from "../modules/Banner";
import CharacterTabs from "~/modules/CharacterTabs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <>
    <Banner />
    <div className="wrapper py-5 px-3 xl:px-0">
      <CharacterTabs />
    </div>
  </>
}
