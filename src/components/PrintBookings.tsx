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

interface IPrintBookingsProps {
  bookingDetails: IBookingInformation;
  customerDetails: ICustomerInformation;
}

export function PrintBookings(props: IPrintBookingsProps) {
  return (
    <>
      <tr>
        <td>Bokningsid:{props.bookingDetails.id}</td>
        <td>Datum: {props.bookingDetails.date}</td>
        <td>Tid: {props.bookingDetails.time}</td>
        <td> Antal gäster: {props.bookingDetails.numberOfGuests}</td>
        <td>Kundid: {props.bookingDetails.customerId}</td>
      </tr>
    </>
  );
}
