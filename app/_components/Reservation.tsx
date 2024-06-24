import { FC, ReactNode } from "react";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import {
  getBookedDatesByCabinId,
  getSettings,
} from "../_services/data-service";
import { ICabin } from "../_services/schemas";

interface IProps {
  cabin: ICabin;
}
const Reservation: FC<IProps> = async ({ cabin }: { cabin: ICabin }) => {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id?.toString() ?? ""),
  ]);

  console.log(settings);

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        cabin={cabin}
        settings={settings}
        bookedDates={bookedDates}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
};

export default Reservation;
