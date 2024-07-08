"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";
import { getBookedDatesByCabinId, getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}

export async function signOutAction() {
  await signOut({
    redirectTo: "/",
  });
}

export async function updateGuest(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  let nationality = formData.get("nationality");
  let countryFlag = null;

  const nationalID = formData.get("nationalID");

  if (typeof nationality === "string") {
    [nationality, countryFlag] = nationality.split("%");
  }

  const alphanumericRegex = /^[a-zA-Z0-9]{6,12}$/;
  if (!alphanumericRegex.test(nationalID?.toString() || "")) {
    throw new Error(
      "National ID must be an alphanumeric string between 6 and 12 characters"
    );
  }

  const updateGuestData = { nationality, countryFlag, nationalID };

  const { error } = await supabase
    .from("guests")
    .update(updateGuestData)
    .eq("id", session?.user?.id);

  if (error) {
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId: string) {
  const session = await auth();
  if (!session)
    throw new Error("You must be logged in to delete a reservation");

  const guestBookings = await getBookings(session?.user?.id || "");
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(Number(bookingId)))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function getBooking(bookingId: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", bookingId)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not get loaded");
  }

  return data;
}

export async function createBooking(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must log into before creating a booking");

  const data = JSON.parse(formData.get("data")?.toString() || "");

  const extrasPrice = 0;

  formData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000),
    extrasPrice,
    cabinPrice: data.cabinPrice,
    totalPrice: data.cabinPrice + extrasPrice,
    hasBreakfast: false,
    status: "unconfirmed",
    guestId: session?.user?.id,
    ...data,
  };

  const bookedDates = await getBookedDatesByCabinId(data.cabinId);

  if (bookedDates.includes(data.startDate || data.endDate))
    throw new Error("Dates have already been booked");

  const { error } = await supabase.from("bookings").insert([formData]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${data.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function updateBooking(formData: FormData) {
  const session = await auth();

  const id = formData.get("bookingId");

  const guestBookings = await getBookings(session?.user?.id || "");
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  const dataToUpdate = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000),
  };

  if (!guestBookingsIds.includes(Number(id)))
    throw new Error("You are not allowed to update this booking");

  const { error } = await supabase
    .from("bookings")
    .update(dataToUpdate)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  redirect("/account/reservations");
}
