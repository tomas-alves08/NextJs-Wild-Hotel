"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { IRange } from "../_services/schemas";

interface IReservationContext {
  range: IRange | undefined;
  setRange: (range: IRange) => void;
  resetRange: () => void;
}

const initialState = { from: undefined, to: undefined } as IRange;
const ReservationContext = createContext<IReservationContext>({
  range: initialState,
  setRange: () => {},
  resetRange: () => {},
});

function ReservationProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState<undefined | IRange>(initialState);

  function resetRange() {
    setRange(initialState);
  }

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);

  if (context === undefined) throw new Error("Context used outside provider");

  return context;
}

export { ReservationProvider, useReservation };
