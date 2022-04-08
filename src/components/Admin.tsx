import "../style/style.scss";
import { useEffect, useState } from "react";
import { PrintBookings } from "./PrintBookings";

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
        <tr key={i} className="tableRowToFlex">
          <td>
            Bokningsid: {booking.id}
            <br />
            Datum: {booking.date}
            <br />
            Tid: {booking.time}
            <br />
            Antal gäster: {booking.numberOfGuests}
            <br />
            Kundid: {booking.customerId}
          </td>
          {/* <td>Bokningsid: {booking.id}</td>
          <td>Datum: {booking.date}</td>
          <td>Tid: {booking.time}</td>
          <td> Antal gäster: {booking.numberOfGuests}</td>
          <td>Kundid: {booking.customerId}</td> */}
        </tr>
      );
    }
  );

  let customerInformation = customerInfo.map(
    (customer: ICustomerInformation, i) => {
      return (
        <tr key={i} className="tableRowToFlex">
          <td>Kundid: {customer.id}</td>
          <td>Förnamn: {customer.name}</td>
          <td>Efternamn: {customer.lastname}</td>
          <td>Email: {customer.email}</td>
          <td>Telefon: {customer.phone}</td>
        </tr>
      );
    }
  );

  // for (let i = 0; i < bookingInfo.length; i++) {
  //   for (let j = 0; j < customerInfo.length; j++) {
  //     if (bookingInfo[i].customerId === customerInfo[j].id) {
  //       console.log("hej");
  //     }
  //   }
  // }

  //Man kanske kan sortera på id istället, då måste de ju ligga bredvid varandra. Ingen kund utan bokning? Eller behålls uppgifterna om kunden även om bokningen tas bort?

  return (
    <>
      <table className="tableBookingCustomerDetails">
        <tbody>
          <tr>
            <th>Bokningsinfo</th>
            <th>Kundinfo</th>
            <th>Radera bokning</th>
          </tr>
          {bookingInformation}
          {customerInformation}
        </tbody>
      </table>
    </>
  );
}
