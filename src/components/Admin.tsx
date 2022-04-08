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
  //Customer info måste hämtas och sparas i en lista som vi mappar igenom
  const [cutstomerInfo, setCustomerInfo] = useState([
    {
      id: "623b85d54396b96c57bde7c3",
      name: "Franzén",
      lastname: "Sebastian",
      email: "someone@somedomain.com",
      phone: "070-1112233",
    },
    {
      id: "623b85d54396b96c57bde7c3",
      name: "Hydmark",
      lastname: "Tove",
      email: "someone@somedomain.com",
      phone: "070-1112233",
    },
  ]);
  //Samma med booking info
  const [bookingInfo, setBookingInfo] = useState([
    {
      id: "1234",
      restaurantId: "623b85d54396b96c57bde7c3",
      date: "2022-01-01",
      time: "18:00",
      numberOfGuests: 4,
      customerId: "623b85d54396b96c57bde7c3",
    },
    {
      id: "5678",
      restaurantId: "623b85d54396b96c57bde7c3",
      date: "2022-01-01",
      time: "18:00",
      numberOfGuests: 4,
      customerId: "623b85d54396b96c57bde7c3",
    },
  ]);

  useEffect(() => {
    setBookingInfo([...bookingInfo]);
    console.log(bookingInfo);
  }, []);
  //Filtrera på id. delete tar bort via id också så det är bäst
  let bookingInformation = bookingInfo.map(
    (booking: IBookingInformation, i) => {
      return (
        <>
          <PrintBookings
            bookingDetails={booking}
            // customerDetails={undefined}
          ></PrintBookings>
        </>
      );
    }
  );

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>Bokningsinfo</th>
            <th>Kundinfo</th>
            <th>Radera bokning</th>
          </tr>
          {bookingInformation}
        </tbody>
      </table>
    </>
  );
}
