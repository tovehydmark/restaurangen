import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RestaurantBooking } from "../models/RestaurantBooking";
import { url, resId } from "../services/createRestaurant";

export function Admin() {
  //List of bookings fetched from API
  const [bookings, setBookings] = useState<RestaurantBooking[]>([]);

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

  return (
    <div>
      <h2>Admin</h2>
      {lis}
    </div>
  );
}
