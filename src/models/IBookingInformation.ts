export interface IBookingInformation {
  _id: string;
  restaurantId: string;
  date: string; //"2022-01-01"
  time: string; //"18:00"
  numberOfGuests: number;
  customerId: string;
}
