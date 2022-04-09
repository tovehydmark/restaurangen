import "../style/style.scss";
import { useEffect, useState } from "react";

interface ICustomerInformation {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phone: string; //"070-1112233"
}

interface IBookingInformation {
  id: string;
  restaurantId: string;
  date: string; //"2022-01-01"
  time: string; //"18:00"
  numberOfGuests: number;
  customerId: string;
}

export function Admin() {
  //Booking info måste hämtas och sparas i en lista som vi mappar igenom. Detta bara placeholder
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
      date: "2022-01-01",
      time: "18:00",
      numberOfGuests: 4,
      customerId: "623b85d54396b96c57bde7c3",
    },
  ]);

  //Samma med customer info
  const [customerInfo, setCustomerInfo] = useState([
    {
      id: "333333333",
      name: "Franzén",
      lastname: "Sebastian",
      email: "someone@somedomain.com",
      phone: "070-1112233",
    },
    {
      id: "6666666",
      name: "Hydmark",
      lastname: "Tove",
      email: "evot@kramdyh.se",
      phone: "070-0000000",
    },
  ]);

  //Uppdaterar booking info-listan
  useEffect(() => {
    setBookingInfo([...bookingInfo]);
    console.log(bookingInfo);
  }, []);

  //Uppdaterar kund-listan
  useEffect(() => {
    setCustomerInfo([...customerInfo]);
    // console.log(customerInfo);
  }, []);

  //Kan man kanske skapa en ny lista som man pushar
  let bookingInformation = bookingInfo.map(
    (booking: IBookingInformation, i) => {
      return (
        <td key={i} className="tableRowToFlex">
          Bokningsid: {booking.id}
          Datum: {booking.date}
          Tid: {booking.time}
          Antal gäster: {booking.numberOfGuests}
          Kundid: {booking.customerId}
        </td>
      );
    }
  );

  let customerInformation = customerInfo.map(
    (customer: ICustomerInformation, i) => {
      return (
        <td key={i} className="tableRowToFlex">
          Kundid: {customer.id}
          Förnamn: {customer.name}
          Efternamn: {customer.lastname}
          Email: {customer.email}
        </td>
      );
    }
  );

  //Får problem med layouten när jag vill ha en knapp i tabellen. Kommer nog göra en styled div och använda istället för tabell, tror det blir enklare så

  return (
    <>
      <table className="tableBookingCustomerDetails">
        <tbody>
          <tr>
            <th>Bokningsinfo</th>
            <th>Kundinfo</th>
            <th>Radera bokning</th>
          </tr>

          <tr>{bookingInformation}</tr>
          <tr>{customerInformation}</tr>
        </tbody>
      </table>
    </>
  );
}
