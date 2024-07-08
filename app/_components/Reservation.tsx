import { FC } from "react";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import {
  getBookedDatesByCabinId,
  getSettings,
} from "../_services/data-service";
import { ICabin } from "../_services/schemas";
import { auth } from "../_services/auth";
import LoginMessage from "./LoginMessage";

interface IProps {
  cabin: ICabin;
}
const Reservation: FC<IProps> = async ({ cabin }: { cabin: ICabin }) => {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id?.toString() ?? ""),
  ]);

  const session = await auth();

  console.log(session?.user);

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        cabin={cabin}
        settings={settings}
        bookedDates={bookedDates}
      />
      {session?.user ? (
        <ReservationForm
          cabin={cabin}
          name={session?.user?.name || ""}
          image={session?.user?.email || ""}
        />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
};

export default Reservation;
