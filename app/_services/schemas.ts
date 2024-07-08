export interface IGuests {
  fullName: string;
  email: string;
  countryFlag?: string;
  nationalID?: string;
  country?: string;
  nationality?: string;
}

export interface IStatus {
  unconfirmed: string;
  "checked-in": string;
  "checked-out": string;
}

export type StatusType = "unconfirmed" | "checked-in" | "checked-out";

export interface IBooking {
  id?: string;
  cabinId?: number;
  guestId?: number;
  created_at?: string;
  startDate?: string;
  endDate?: string;
  numNights?: number;
  numGuests?: number;
  cabinPrice?: string;
  extrasPrice?: string;
  totalPrice?: string;
  hasBreakfast?: boolean;
  observations?: string;
  isPaid?: boolean;
  guests?: IGuests;
  cabins?: ICabin[];
  status?: "unconfirmed" | "checked-in" | "checked-out";
}

export interface IStartData {
  duration: string;
  value: number;
  color: string;
}

export interface ISalesData {
  label: string;
  totalSales: number;
  extrasSales: number;
}

export interface IColor {
  totalSales: { stroke: string; fill: string };
  extrasSales: { stroke: string; fill: string };
  text: string;
  background: string;
}

export interface ICabin {
  id?: number;
  created_at?: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: any;
  description?: string;
}

export interface IError {
  code: string;
  details: string;
  hint: string;
  message: string;
}

export interface ISetting {
  id: number;
  created_at: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

export type tableFilters = "all" | "with-discount" | "no-discount";
export type bookingsSort =
  | "startDate-desc"
  | "startDate-asc"
  | "totalPrice-desc"
  | "totalPrice-asc";

export interface IFilter {
  field: "status";
  value: string | number;
  method?: "eq" | "gte" | "gt" | "lte" | null;
}

export interface ISort {
  field: "startDate" | "totalPrice";
  direction: "asc" | "desc";
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ISignup {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm?: string;
}

// export interface IUser {
//   fullName?: string;
//   password?: string;
//   avatar?: File | null;
// }

export interface IAuthUser {
  name: string | null | undefined;
  email: string;
  image?: string | File | null | undefined;
  id?: string;
}

export interface ICountry {
  name: string;
  flag: string;
  independent: boolean;
}

export type FilterType = "all" | "small" | "medium" | "large";

export interface IRange {
  from: Date | undefined;
  to?: Date | undefined;
}
