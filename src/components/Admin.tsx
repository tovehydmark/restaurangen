import "../style/style.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { IBookingInformation } from "../models/IBookingInformation";
import { resId } from "./Booking";

export function Admin() {
  //Booking info måste hämtas och sparas i en lista som vi mappar igenom. Detta bara placeholder

  const [booking, setBooking] = useState<IBookingInformation[]>([]);

  const [bookingInfo, setBookingInfo] = useState([
    {
      id: "333333333",
      restaurantId: "623b85d54396b96c57bde7c3",
      date: "2022-01-01",
      time: "18:00",
      numberOfGuests: 4,
      customerId: "623b85d54396b96c57bde7c3",
    },
    {
      id: "6666666",
      restaurantId: "623b85d54396b96c57bde7c3",
      date: "2022-01-05",
      time: "18:00",
      numberOfGuests: 4,
      customerId: "623b85d54396b96c57bde7c3",
    },
  ]);

  //Samma med customer info
  const [customerInfo, setCustomerInfo] = useState([
    {
      id: "333333333",
      name: "Esty",
      lastname: "Alvarez",
      email: "someone@somedomain.com",
      phone: "070-1112233",
    },
    {
      id: "6666666",
      name: "Tove",
      lastname: "Hydmark",
      email: "evot@kramdyh.se",
      phone: "070-0000000",
    },
  ]);

  useEffect(() => {
    axios
      .get<IBookingInformation[]>(
        "https://school-restaurant-api.azurewebsites.net/booking/restaurant/" +
          resId
      )
      .then((response) => {
        console.log(response);

        setBooking(response.data);
      });
  }, []);

  // //Uppdaterar booking info-listan
  // useEffect(() => {
  //   setBookingInfo([...bookingInfo]);
  // }, []);

  // //Uppdaterar kund-listan
  // useEffect(() => {
  //   setCustomerInfo([...customerInfo]);
  //   // console.log(customerInfo);
  // }, []);

  let bookingInformation = booking.map((booking, i) => {
    return (
      <div key={i} className="bookingDetails">
        <ul>
          <li>Bokningsid: {booking._id}</li>
          <li>Kundid: {booking.customerId}</li>
          <li>Datum: {booking.date}</li>
          <li>Tid: {booking.time}</li>
          <li>Antal gäster: {booking.numberOfGuests}</li>
        </ul>
        <button>Ändra kunduppgifter</button>
      </div>
    );
  });

  let customerInformation = customerInfo.map((customer, i) => {
    return (
      <div key={i} className="bookingDetails">
        <ul>
          <li>Bokningsid: {customer.id}</li>
          <li>Namn: {customer.name}</li>
          <li>Efternamn: {customer.lastname}</li>
          <li>Email: {customer.email}</li>
          <li>Telefon: {customer.phone}</li>
        </ul>
        <div className="buttonPosition">
          <button>Ändra bokning</button>
          <button>Radera bokning</button>
        </div>
      </div>
    );
  });

  return (
    <section className="showBookings">
      <div>
        <p>Bokningsinformation</p>
        {bookingInformation}
      </div>
      <div>
        <p>Kunduppgifter</p>
        {customerInformation}
      </div>
    </section>
  );
}

//Halvdan lösning med tabell. Valde att göra divar med listor istället då jag inte kom på något sätt att få in datan från två olika listor i samma tabell utan att skapa nya table-rows (så att bara första table-headern fick info).

// let bookingInformation = bookingInfo.map(
//   (booking: IBookingInformation, i) => {
//     return (
//       <td key={i} className="tableRowToFlex">
//         Bokningsid: {booking.id}
//         Datum: {booking.date}
//         Tid: {booking.time}
//         Antal gäster: {booking.numberOfGuests}
//         Kundid: {booking.customerId}
//         <button>Ändra</button>
//       </td>
//     );
//   }
// );

// let customerInformation = customerInfo.map(
//   (customer: ICustomerInformation, i) => {
//     return (
//       <td key={i} className="tableRowToFlex">
//         Kundid: {customer.id}
//         Förnamn: {customer.name}
//         Efternamn: {customer.lastname}
//         Email: {customer.email}
//         <button>Ändra</button>
//         <button>Ta bort</button>
//       </td>
//     );
//   }
// );

// <table>
//         <tbody className="bookingDetailsTable">
//           <tr>
//             <th>Bokningsinfo</th>
//             <th>Kundinfo</th>
//             <th>Radera bokning</th>
//           </tr>

//           <tr>
//             <td>bokningsinfo</td>
//             <td>kundinfo</td>
//             <td>
//               <button>hej</button>
//             </td>
//           </tr>

//           <tr>
//             {bookingInformation} {customerInformation} <button>Radera bokning</button>
//           </tr>

//Denna under funkar men inte den över då den skapar en ny td för varje kund och lägger in på en lång rad i tr ovan.
//           <tr>
//             <td>hej</td>
//             <td>på</td>
//             <td>dig</td>
//           </tr>

//         </tbody>
//       </table>
