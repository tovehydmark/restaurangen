import { useState } from "react";

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
  //Customer info måste hämtas och sparas i en lista som vi mappar igenom
  const [cutstomerInfo, setCustomerInfo] = useState([]);
  //Samma med booking info
  const [bookingInfo, setBookingInfo] = useState([]);

  //Filtrera på id. delete tar bort via id också så det är bäst

  return (
    <>
      <table>
        <tr>
          <th>Bokningsinfo</th>
          <th>Kundinfo</th>
          <th>Radera bokning</th>
        </tr>
      </table>
    </>
  );
}
