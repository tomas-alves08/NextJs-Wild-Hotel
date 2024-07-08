import { unstable_noStore as noStore } from "next/cache";

import { FC } from "react";
import CabinCard from "./CabinCard";
import { ICabin } from "../_services/schemas";

import { getCabins } from "../_services/data-service";

interface IProps {
  filter: string;
}
const CabinList: FC<IProps> = async ({ filter }: { filter: string }) => {
  noStore();

  const cabins = await getCabins();

  if (!cabins.length) return null;

  let filteredCabins = cabins;
  if (filter === "small")
    filteredCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    filteredCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  if (filter === "large")
    filteredCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin: ICabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
};

export default CabinList;
