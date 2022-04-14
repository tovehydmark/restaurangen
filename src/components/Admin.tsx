import "../style/style.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { IBookingInformation } from "../models/IBookingInformation";
import { resId } from "./Booking";
import { ICustomerInformation } from "../models/ICustomerInformation";
import { FetchBookings } from "../models/FetchBookings";

// class Booking {
//   constructor(
//     public bookingId: string,
//     public restaurantId: string,
//     public date: string,
//     public time: string,
//     public numberOfGuests: number,
//     public customerId: string,
//     public customer?: Customer
//   ) {}
// }

// class Customer {
//   constructor(
//     // public customerId: string,
//     public name: string,
//     public lastname: string,
//     public email: string,
//     public phone: string
//   ) {}
// }

//Nu skriver den ut bokningar + kunder i rätt antal UTAN react.StrictMode!

//Eftersom looparna inte hänger ihop måste vi prova att filtrera resultaten utefter kund-id och se att vi får ut rätt bokningar vid rätt kund. Viktigt också för att se att vi faktiskt skriver ut rätt kunder och att den inte fått flip.
//Därför måste vi få in att hämta kund-id från bokningen

export function Admin() {
  const [booking, setBooking] = useState<IBookingInformation[]>([]);
  // const [customer, setCustomer] = useState<ICustomerInformation[]>([]);

  const [customerList, setCustomerList] = useState<ICustomerInformation[]>([]);

  //Hämta bokningar
  useEffect(() => {
    if (booking.length > 0) return;

    axios
      .get<IBookingInformation[]>(
        "https://school-restaurant-api.azurewebsites.net/booking/restaurant/" +
          resId
      )
      .then((response) => {
        //Sorterar listan så den hamnar i rätt ordning på skärmen och sparar sen till setBooking
        response.data.sort((a, b) => {
          return a.customerId.localeCompare(b.customerId);
        });

        setBooking(response.data);

        response.data.map((bookingInMap: IBookingInformation) => {
          axios
            .get<ICustomerInformation[]>(
              "https://school-restaurant-api.azurewebsites.net/customer/" +
                bookingInMap.customerId
            )
            .then((response) => {
              response.data.map((customerFromApi) => {
                customerList.push(customerFromApi);

                //Sorterar listan så den hamnar i rätt ordning på skärmen och sparar sen till CustomerList
                customerList.sort((a, b) => {
                  return a._id.localeCompare(b._id);
                });

                setCustomerList([...customerList]);
              });
            });
        });
      });
  });

  // console.log(customer); //Här får vi ut en lista med alla customers, om vi kör setCustomer som ovan - setCustomer(bookingListForPush) och - setCustomer([...customer]);

  // let customerGlobal: Customer = {
  //   name: "",
  //   lastname: "",
  //   email: "",
  //   phone: "",
  // };

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

  let customerInformation = customerList?.map((customer, i) => {
    return (
      <div key={i} className="bookingDetails">
        <ul>
          <li>Bokningsid: {customer._id}</li>
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
