//Created a new component to test out this code for admin aswell. We can decided as a group what we think works best.
//Put and Delete is also implemented here

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { url, resId } from "../services/createRestaurant";

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

//The Customer class containing all objectkeys from API when fetching a customer.
export class Customer {
  constructor(
    public name: string,
    public lastname: string,
    public email: string,
    public phone: string,
    public id?: string
  ) {}
}

//Bookings interface
export interface IBookings {
  _id: string;
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: string;
  customerId: string;
  customer: Customer;
}

export function Admin() {
  //List of bookings fetched from API
  const [bookings, setBookings] = useState<RestaurantBooking[]>([]);
  // //The restaurant id
  // let resId = "624c1940850953b8ad161715";

  useEffect(() => {
    //Fetches bookings from API
    axios
      .get<RestaurantBooking[]>(url + "booking/restaurant/" + resId)
      .then((response) => {
        let bookingsFromAPI = response.data.map(
          (booking: RestaurantBooking) => {
            return new RestaurantBooking(
              booking._id,
              booking.date,
              booking.time,
              booking.numberOfGuests,
              booking.customerId
            );
          }
        );
        setBookings(bookingsFromAPI);
      });
  }, []);

  //Maps out the bookings with customer in a rendered list.
  let lis = bookings.map((booking, i) => {
    console.log(booking.customerId);

    return (
      <ul key={i} className="bookingInList">
        <li>Boknings id: {booking._id}</li>
        <li>Kund id: {booking.customerId}</li>
        <li>Datum: {booking.date}</li>
        <li>Tid: {booking.time}</li>
        <li>Antal gäster: {booking.numberOfGuests}</li>

        <Link className="showBookingsBtn" to={`/bookinginfo/${booking._id}`}>
          Visa bokning
        </Link>
      </ul>
    );
  });

  return <div>{lis}</div>;
}
