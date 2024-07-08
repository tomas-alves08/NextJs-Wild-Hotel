import {
  getBookedDatesByCabinId,
  getCabin,
} from "@/app/_services/data-service";

export async function GET(_: any, { params }: { params: { cabinId: string } }) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch (err: any) {
    return Response.json("Cabin not found");
  }
}
