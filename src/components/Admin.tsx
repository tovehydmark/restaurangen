import "../style/style.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { IBookingInformation } from "../models/IBookingInformation";
import { resId } from "./Booking";
import { ICustomerInformation } from "../models/ICustomerInformation";
import { FetchBookings } from "../models/FetchBookings";

class Booking {
  constructor(
    public bookingId: string,
    public restaurantId: string,
    public date: string,
    public time: string,
    public numberOfGuests: number,
    public customerId: string,
    public customer?: Customer
  ) {}
}

class Customer {
  constructor(
    // public customerId: string,
    public name: string,
    public lastname: string,
    public email: string,
    public phone: string
  ) {}
}

export function Admin() {
  //Booking info måste hämtas och sparas i en lista som vi mappar igenom. Detta bara placeholder

  const [booking, setBooking] = useState<Booking[]>([]);
  const [customer, setCustomer] = useState<Customer>();
  // const [customerId, setCustomerId] = useState<Booking[]>([]);

  const [customerList, setCustomerList] = useState<FetchBookings[]>([]);
  console.log(booking);
  //Hämta bokningar
  useEffect(() => {
    if (booking.length > 0) return;
    axios
      .get<IBookingInformation[]>(
        "https://school-restaurant-api.azurewebsites.net/booking/restaurant/" +
          resId
      )
      .then((response) => {
        let bookingsFromAPI = response.data.map(
          (bookingInMap: IBookingInformation) => {
            // console.log(bookingInMap.customerId);

            // customerID.push(bookingInMap.customerId);

            axios
              .get<ICustomerInformation>(
                "https://school-restaurant-api.azurewebsites.net/customer/" +
                  bookingInMap.customerId
              )
              .then((response) => {
                // console.log(response.data);

                // let customerGlobal2: Customer = {
                //   name: response.data.name,
                //   lastname: response.data.lastname,
                //   email: response.data.email,
                //   phone: response.data.phone,
                // };

                // return new Customer(
                //   response.customerId,
                //   customerInMap.name,
                //   customerInMap.lastname,
                //   customerInMap.email,
                //   customerInMap.phone
                // );

                customerGlobal = response.data;
                // console.log(customerGlobal);
              });

            return new Booking(
              bookingInMap._id,
              bookingInMap.restaurantId,
              bookingInMap.date,
              bookingInMap.time,
              bookingInMap.numberOfGuests,
              bookingInMap.customerId,
              customerGlobal
            );
          }
        );

        setBooking(bookingsFromAPI);
      });
  }, [booking]);

  let customerGlobal: Customer = {
    name: "",
    lastname: "",
    email: "",
    phone: "",
  };

  // function getTheCustomers(customerId: string) {
  //   // console.log(customerId);

  //   axios
  //     .get<ICustomerInformation[]>(
  //       "https://school-restaurant-api.azurewebsites.net/customer/" + customerId
  //     )
  //     .then((response) => {
  //       console.log(response);

  //       let customerFromAPI = response.data.map(
  //         (customerInMap: ICustomerInformation) => {
  //           // console.log(customerInMap);

  //           return new Customer(
  //             customerInMap.id,
  //             customerInMap.name,
  //             customerInMap.lastname,
  //             customerInMap.email,
  //             customerInMap.phone
  //           );
  //         }
  //       );

  //       console.log(response.data);
  //       console.log(customerFromAPI);

  //       setCustomer(customerFromAPI);
  //     });
  // }

  //Hämta kunder
  // useEffect(() => {
  //   axios
  //     .get<ICustomerInformation[]>(
  //       "https://school-restaurant-api.azurewebsites.net/customer/" + customerID
  //     )
  //     .then((response) => {
  //       let customerFromAPI = response.data.map(
  //         (customerInMap: ICustomerInformation) => {
  //           console.log(customerInMap.id);

  //           return new Customer(
  //             customerInMap.id,
  //             customerInMap.name,
  //             customerInMap.lastname,
  //             customerInMap.email,
  //             customerInMap.phone
  //           );
  //         }
  //       );
  //       // console.log(response);
  //       setCustomer(customerFromAPI);
  //     });
  // }, [booking]);

  // hämtar bokning med restaurangid
  // loopa bokning för att få ut kundid
  // hämta kunden genom bokningsid
  // useEffect(() => {
  //   axios
  //     .get<IBookingInformation[]>(
  //       "https://school-restaurant-api.azurewebsites.net/booking/restaurant/" +
  //         resId
  //     )
  //     .then((response) => {
  //       let customerFromApi = response.data.map(
  //         (customer: IBookingInformation) => {
  //           getCustomer(customer.customerId);
  //         }
  //       );

  //       setBooking(response.data);
  //     });
  // }, []);

  // useEffect(() => {
  //   setCustomerList(testList);
  // }, []);
  // console.log(customerList);

  // function getCustomer(customerId: string) {
  //   axios
  //     .get<ICustomerInformation[]>(
  //       "https://school-restaurant-api.azurewebsites.net/customer/" + customerId
  //     )
  //     .then((response) => {
  //       let customerBookings = response.data.map(
  //         (bookings: ICustomerInformation) => {
  //           // console.log(bookings);
  //           testList.push(bookings);
  //           return new FetchBookings(
  //             bookings.id,
  //             bookings.name,
  //             bookings.lastname,
  //             bookings.email,
  //             bookings.phone
  //           );
  //         }
  //       );

  //       console.log(testList);

  //       setCustomer(customerBookings);
  //       console.log(customerBookings);
  //     });
  // }
  // useEffect(() => {
  //   axios
  //     .get<ICustomerInformation[]>(
  //       "https://school-restaurant-api.azurewebsites.net/customer/" +
  //         "CUSTOMERID"
  //     )
  //     .then((response) => {
  //       console.log(response);

  //       setCustomer(response.data);
  //     });
  // }, []);

  // //Uppdaterar booking info-listan
  // useEffect(() => {
  //   setBookingInfo([...bookingInfo]);
  // }, []);

  // //Uppdaterar kund-listan
  // useEffect(() => {
  //   setCustomerInfo([...customerInfo]);
  //   // console.log(customerInfo);
  // }, []);

  // let bookingInformation = booking.map((booking, i) => {
  //   return (
  //     <div key={i} className="bookingDetails">
  //       <ul>
  //         <li>Bokningsid: {booking._id}</li>
  //         <li>Kundid: {booking.customerId}</li>
  //         <li>Datum: {booking.date}</li>
  //         <li>Tid: {booking.time}</li>
  //         <li>Antal gäster: {booking.numberOfGuests}</li>
  //       </ul>
  //       <button>Ändra kunduppgifter</button>
  //     </div>
  //   );
  // });

  let customerInformation = customerList.map((customer, i) => {
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
        {/* {bookingInformation} */}
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
