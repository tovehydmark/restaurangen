import { INewUser } from "./INewUser";

export interface INewBooking {
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: string;
  customer: INewUser;
}
