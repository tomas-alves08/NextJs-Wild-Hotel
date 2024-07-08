"use client";

import { ReactNode, useOptimistic } from "react";
import { IBooking } from "../_services/schemas";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "../_services/actions";

function ReservationList({ bookings }: { bookings: IBooking[] }): ReactNode {
  const [optimisticBookings, optmisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId: string) {
    optmisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings?.map((booking: any) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
