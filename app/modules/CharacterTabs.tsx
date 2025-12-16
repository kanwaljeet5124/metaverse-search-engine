import {Tabs, Tab, Card, CardBody, Image, CardFooter, Badge, Chip} from "@heroui/react";
import Characters from "./Characters";
import Locations from "./Locations";
import { useSearchParams } from "react-router";
import Episodes from "./Episodes";

export default function CharacterTabs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabStateChangeHandler = (key: number|string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    setSearchParams(params);
  }

  return (
    <div className="flex w-full flex-col items-center mt-2">
      <Tabs aria-label="Options" color="primary" size="lg" variant="solid" onSelectionChange={tabStateChangeHandler}>
        <Tab key="characters" title="Characters" className="w-full">
          <Characters />
        </Tab>
        <Tab key="locations" title="Locations" className="w-full">
          <Locations />
        </Tab>
        <Tab key="episodes" title="Episodes" className="w-full">
          <Episodes />
        </Tab>
      </Tabs>
    </div>
  );
}
