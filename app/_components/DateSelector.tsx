"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { ReactElement, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ICabin, IRange, ISetting } from "../_services/schemas";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range: IRange, datesArr: Date[]) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(new Date(date), {
        start: range.from || "",
        end: range.to || "",
      })
    )
  );
}

export default function DateSelector({
  cabin,
  settings,
  bookedDates,
}: {
  cabin: ICabin;
  settings: ISetting;
  bookedDates: Date[];
}): ReactElement {
  const { range, setRange, resetRange } = useReservation();

  const displayRange = isAlreadyBooked(
    range || {
      from: new Date(),
      to: new Date(),
    },
    bookedDates
  )
    ? {
        from: new Date(),
        to: new Date(),
      }
    : (range as IRange);

  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(
    displayRange?.to || "",
    displayRange?.from || ""
  );

  console.log(bookedDates.map((x) => x.toString()));

  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        onSelect={(range: IRange | undefined) => {
          if (!range)
            setRange({
              from: undefined,
              to: undefined,
            });
          else setRange({ from: range.from, to: range.to });
        }}
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}
