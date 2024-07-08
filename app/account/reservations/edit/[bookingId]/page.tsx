import SubmitButton from "@/app/_components/SubmitButton";
import { getBooking, updateBooking } from "@/app/_services/actions";
import { getCabin } from "@/app/_services/data-service";
import { FC } from "react";

interface IProps {
  params: { bookingId: string };
}

const Page: FC<IProps> = async ({ params }) => {
  const { bookingId } = params;

  const { cabinId, numGuests, observations } = await getBooking(bookingId);
  const { maxCapacity } = await getCabin(cabinId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>

      <form
        action={updateBooking}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
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
            defaultValue={observations}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <input name="bookingId" type="hidden" value={bookingId} />

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel="Updating">
            Update Reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default Page;
