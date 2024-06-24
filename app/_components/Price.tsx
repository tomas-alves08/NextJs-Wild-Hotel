import { getCabinPrice } from "@/app/_services/data-service";
import { FC, ReactElement } from "react";

interface IPriceProps {
  cabinId: string;
}
const Price: FC<IPriceProps> = async ({ cabinId }) => {
  const cabin = await getCabinPrice(cabinId);
  if (!cabin) return null;

  const { regularPrice, discount } = cabin;

  const resp = await fetch("http.api.com");

  return (
    <p className="mt-12 text-3xl flex gap-3 items-baseline">
      {discount > 0 ? (
        <>
          <span className="text-3xl font-[350]">
            ${regularPrice - discount}
          </span>
          <span className="line-through font-semibold text-primary-600">
            ${regularPrice}
          </span>
        </>
      ) : (
        <span className="text-3xl font-[350]">${regularPrice}</span>
      )}
      <span className="text-primary-200">/ night</span>
    </p>
  );
};

export default Price;
