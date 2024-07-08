"use client";

import { ReactElement } from "react";
import { IAuthUser, ICabin } from "../_services/schemas";
import { useReservation } from "./ReservationContext";
import Image from "next/image";
import { differenceInDays } from "date-fns";
import { createBooking } from "../_services/actions";
import SubmitButton from "./SubmitButton";

export default function ReservationForm({
  cabin,
  name,
  image,
}: {
  cabin: ICabin;
  name: string;
  image: string;
}): ReactElement {
  const { range, resetRange } = useReservation();
  // CHANGE
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range?.from;
  const endDate = range?.to;

  const numNights = differenceInDays(endDate || "", startDate || "");
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate: startDate || "",
    endDate: endDate || "",
    numNights,
    cabinId: id || 0,
    cabinPrice,
  };

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        {typeof image === "string" && (
          <div className="flex gap-4 items-center">
            <div className="relative h-8 aspect-square">
              <Image
                referrerPolicy="no-referrer"
                className="h-8 rounded-full object-cover"
                fill
                src={`/${image}`}
                alt={name}
              />
            </div>
            <p>{name}</p>
          </div>
        )}
      </div>

      {range?.from?.toDateString() && (
        <p>
          {range?.to && "from"} {range?.from?.toDateString()}{" "}
          {range?.to && "to"} {range?.to?.toDateString()}
        </p>
      )}

      <form
        // action={createBooking}
        action={async (formData) => {
          await createBooking(formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <input type="hidden" name="data" value={JSON.stringify(bookingData)} />

        <div className="flex justify-end items-center gap-6">
          {!startDate || !endDate ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}
