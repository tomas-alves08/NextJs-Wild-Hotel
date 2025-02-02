import { FC, Suspense } from "react";

import { getCabin, getCabins } from "@/app/_services/data-service";

import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";

interface IParams {
  cabinid: number;
}
export async function generateMetadata({ params }: { params: IParams }) {
  const { name } = await getCabin(params.cabinid.toString());
  return { title: `Cabin ${name}` };
}

// export async function generateStaticParams() {
//   const cabins = await getCabins();

//   const ids = cabins.map((cabin) => ({ cabinid: cabin.id.toString() }));

//   return ids;
// }

interface IProps {
  params: { cabinid: number };
}
const Page: FC<IProps> = async ({ params }) => {
  const cabin = await getCabin(params.cabinid.toString());

  // const { id, name, maxCapacity, regularPrice, discount, image, description } =
  //   cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />} key={cabin.id}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
