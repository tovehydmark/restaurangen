import { Customer } from "../models/Customer";

//RestaurantBooking class containing all objectkeys from API when fetching bookings + a customer object and the resturant id.
//The customer object is fetch throug anoter get from API
//The resturant id is only needed when changing or deleteing a booking, hence its not required
export class RestaurantBooking {
  constructor(
    public _id: string,
    public date: string,
    public time: string,
    public numberOfGuests: string,
    public customerId: string,
    public customer?: Customer,
    public restaurantId?: string,
    public id?: string
  ) {}
}
