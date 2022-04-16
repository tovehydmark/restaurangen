import { ChangeEvent, useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { INewBooking } from "../models/INewBooking";
import { IFormInputs } from "../models/IFormInputs";
import { IBookings } from "../models/IBookings";
import { Bookings } from "../models/Bookings";
import { Button } from "./styledComponents/Button";

export let resId = "624c1940850953b8ad161715";

export class BookingInfo{
  constructor(
  public date: string,
  public time: string,
  public numberOfGuests: string
  ){};
}

function countTables(listOfbookings: Bookings[]) {
  let bookedTables = 0;
  for (let i = 0; i < listOfbookings.length; i++) {
    bookedTables += Math.floor(Number(listOfbookings[i].numberOfGuests) / 6);
    if (Number(listOfbookings[i].numberOfGuests) % 6 != 0) {
      bookedTables += 1;
    }
  }
  return bookedTables;
}

function canBeBooked(numberOfGuests: number, tablesBooked: number) {
  let numberOfTables = 15;
  let tablesNeeded = Math.floor(Number(numberOfGuests) / 6);
  if (Number(numberOfGuests) % 6 != 0) {
    tablesNeeded += 1;
  }

  if (numberOfTables - tablesBooked < tablesNeeded) {
    console.log("Det finns inga lediga bord 18.00");
    return false;
  }
  console.log("Det finns lediga bord");

  return true;
}

export function Booking() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [showFirstTime, setShowFirstTime] = useState(false);
  const [showSecondTime, setShowSecondTime] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showBookTableDiv, setShowTableDiv] = useState(false);
  const [showBookingDiv, setShowBookingDiv] = useState(true);
  const [bookingInfo, setBookingInfo] = useState<BookingInfo>({date:"",time:"",numberOfGuests:""});
  const [bookings, setBookings] = useState<Bookings[]>([]);

  useEffect(() => {
    axios
      .get<IBookings[]>(
        "https://school-restaurant-api.azurewebsites.net/booking/restaurant/" +
          resId
      )
      .then((response) => {
        let bookingsFromAPI = response.data.map((bookings: IBookings) => {
          return new Bookings(
            bookings.date,
            bookings.time,
            bookings.numberOfGuests
          );
        });
        setBookings(bookingsFromAPI);
      });
  }, []);


  function checkFreeTables() {
    let bookedTables = bookings.filter((x) => x.date === date);

    setShowFirstTime(
      canBeBooked(
        Number(numberOfGuests),
        countTables(bookedTables.filter((x) => x.time === "18.00"))
      )
    );

    setShowSecondTime(
      canBeBooked(
        Number(numberOfGuests),
        countTables(bookedTables.filter((x) => x.time === "21.00"))
      )
    );

    setShowTableDiv(true);
    setShowUserForm(false);
  }

  //React-form-hook tar emot data från inputfält vid submit
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>({
    criteriaMode: "all",
  });

  let newBooking: INewBooking = {
    restaurantId: "",
    date: "",
    time: "",
    numberOfGuests: "",
    customer: { name: "", lastname: "", email: "", phone: "" },
  };

  let yearToString = "";
  let monthToString = "";
  let dayToString = "";
  let todaysDate = new Date();
  let todaysDateToString = "";

  //Okej, så insåg att om vi ska använda react kalendern måste datum konverteras till rätt format (en sträng)
  //samt att jag inte har så bra koll på hur man kontrollerar att ett datum inte passerat osv..
  // Men man kan använda input type text istället som retunerar rätt format direkt och verkar enklare att kontrollera.
  // Kanske värt att satsa på istället?

  // function getFreeTables(value: Date) {
  //   setDate(value);
  //   dateToString(value);

  //   let checkDate = yearToString + monthToString + dayToString;
  //   console.log(checkDate);
  // }

  // Konverterar Date till en sträng i samma format som API:et använder
  function dateToString(value: Date) {
    if (value.getDate() < 10) {
      dayToString = "-0" + value.getDate().toString();
    } else {
      dayToString = "-" + value.getDate().toString();
    }

    if (value.getMonth() + 1 < 10) {
      monthToString = "-0" + (value.getMonth() + 1).toString();
    } else {
      monthToString = "-" + (value.getMonth() + 1).toString();
    }
    yearToString = value.getFullYear().toString();

    todaysDateToString = yearToString + monthToString + dayToString;
  }

  dateToString(todaysDate);

  //Skapar en ny användare genom att hämta värden från formulär
  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   let name = e.target.name;
  //   setNewUser({...newUser, [name]: e.target.value})
  // }

  //Kontrollerar och uppdaterar vald tid för bokning
  const setTimeChecked = (e: ChangeEvent<HTMLInputElement>) => {
    let time = e.target.value;
    setTime(time);
  };

  //Kontrollerar och uppdaterar vald dag för bokning
  const setDateChecked = (e: ChangeEvent<HTMLInputElement>) => {
    let date = e.target.value;
    setDate(date);
  };
  //Kontrollerar och uppdaterar antal gäster
  const setGuests = (e: ChangeEvent<HTMLInputElement>) => {
    let guests = e.target.value;
    setNumberOfGuests(guests);
  };
  //Kontrollerar och uppdaterar användaren, skapar objekt för ny bokning som ska skickas till API
  const onSubmit = (user: IFormInputs) => {
    
    newBooking = {
      restaurantId: resId,
      date: date,
      time: time,
      numberOfGuests: numberOfGuests,
      customer: user,
    };
    sendBooking(newBooking);
    setShowBookingDiv(false);
    
  };

  function sendBooking(createBooking: INewBooking) {
    axios
      .post(
        "https://school-restaurant-api.azurewebsites.net/booking/create",
        createBooking
      )
      .then((response) => {
        getBookingInfo(response.data.insertedId)
      });   
  };

  function getBookingInfo(bookingId:string){    
    axios.get("https://school-restaurant-api.azurewebsites.net/booking/" + bookingId)
    .then((response) => {
      let bookingInfoFromApi = response.data[0]   
      setBookingInfo(bookingInfoFromApi);
    });
  };

  function timeSlected() {
    setShowUserForm(true);
  }

  let firstFreeTime = (
    <div className="bookingRadioInput1">
      <input
        required
        type="radio"
        name="time"
        value="18.00"
        onChange={setTimeChecked}
        onClick={timeSlected}
      />
      <label htmlFor="time">18.00</label>
    </div>
  );
  if (!showFirstTime) {
    firstFreeTime = <></>;
  }

  let secondFreeTime = (
    <div className="bookingRadioInput2">
      <input
        className="bookingRadioInput2"
        required
        type="radio"
        name="time"
        value="21.00"
        onChange={setTimeChecked}
        onClick={timeSlected}
      />
      <label htmlFor="time">21.00</label>
    </div>
  );
  if (!showSecondTime) {
    secondFreeTime = <></>;
  }

let userForm =(<form className="bookingUserForm" onSubmit={handleSubmit(onSubmit)}>
<label htmlFor="name">Förnamn: </label>
<input
  placeholder="Sven"
  {...register("name", {
    required: "Du måste fylla i förnamn",
    pattern: {
      value: /^[A-Za-z]+$/i,
      message: "Får bara innehålla bokstäver",
    },
    minLength: {
      value: 2,
      message: "Fältet innehåller för få tecken",
    },
  })}
/>

<ErrorMessage
  errors={errors}
  name="name"
  render={({ messages }) => {
    console.log("messages", messages);
    return messages
      ? Object.entries(messages).map(([type, message]) => (
          <p className="errorMessage" key={type}>
            {message}
          </p>
        ))
      : null;
  }}
/>

<label htmlFor="lastname">Efternamn: </label>
<input
  placeholder="Svensson"
  {...register("lastname", {
    required: "Du måste fylla i efternamn",
    pattern: {
      value: /^[A-Za-z]+$/i,
      message: "Får bara innehålla bokstäver",
    },
    minLength: {
      value: 2,
      message: "Fältet innehåller för få tecken",
    },
  })}
/>

<ErrorMessage
  errors={errors}
  name="lastname"
  render={({ messages }) => {
    console.log("messages", messages);
    return messages
      ? Object.entries(messages).map(([type, message]) => (
          <p className="errorMessage" key={type}>
            {message}
          </p>
        ))
      : null;
  }}
/>

<label htmlFor="email">Email: </label>
<input
  placeholder="sven@domän.se"
  {...register("email", {
    required: "Du måste fylla i email",
    pattern: {
      value: /^[A-Za-z0-9_-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
      message: "Måste vara en emailadress",
    },
    minLength: {
      value: 5,
      message: "Fältet innehåller för få tecken",
    },
  })}
/>

<ErrorMessage
  errors={errors}
  name="email"
  render={({ messages }) => {
    console.log("messages", messages);
    return messages
      ? Object.entries(messages).map(([type, message]) => (
          <p className="errorMessage" key={type}>
            {message}
          </p>
        ))
      : null;
  }}
/>

<label htmlFor="phone">Telefonnummer: </label>
<input
  placeholder="0700000000"
  {...register("phone", {
    required: "Du måste fylla i telefonnummer",
    pattern: {
      value: /^[0-9]+$/i,
      message: "Fältet får endast innehålla siffror",
    },
    minLength: {
      value: 5,
      message: "Fältet innehåller för få tecken",
    },
  })}
/>

<ErrorMessage
  errors={errors}
  name="phone"
  render={({ messages }) => {
    console.log("messages", messages);
    return messages
      ? Object.entries(messages).map(([type, message]) => (
          <p className="errorMessage" key={type}>
            {message}
          </p>
        ))
      : null;
  }}
/>

<div className="gdpr">
  <label htmlFor="GDPR">
    Jag godkänner att The Codfather får lagra och använda mina
    personuppgifter enligt GDPR
  </label>
  <input
    type="checkbox"
    {...register("GDPR", {
      required:
        "Du måste godkänna hantering av personuppgifter för att kunna boka",
    })}
  />
  <ErrorMessage
    errors={errors}
    name="GDPR"
    render={({ messages }) => {
      console.log("messages", messages);
      return messages
        ? Object.entries(messages).map(([type, message]) => (
            <p className="errorMessage" key={type}>
              {message}
            </p>
          ))
        : null;
    }}
  />
</div>

<input className="bookingBtn" type="submit" />
</form>)
if (!showUserForm){
  userForm = (<></>)
};
      
  if (!showUserForm) {
    userForm = <></>;
  }

  let chooseTimeLabel = <label>Välj tid:</label>;
  if (!showFirstTime && !showSecondTime) {
    firstFreeTime = <p>Det finns inga lediga tider!</p>;
    chooseTimeLabel = <></>;
    userForm = <></>;
  }

  let bookTableDiv = (
    <div className="bookingTimesDiv">
      {chooseTimeLabel}
      {firstFreeTime}
      {secondFreeTime}
    </div>
  );
  if (!showBookTableDiv) {
    bookTableDiv = <></>;
  }

  let bookingDiv = (
    <div className="bookingDiv">
      <form className="bookingSearchForm">
        <label htmlFor="date">Välj datum: </label>
        <input
          required
          type="date"
          name="date"
          min={todaysDateToString}
          onChange={setDateChecked}
        ></input>

        <label htmlFor="numberOfGuests">Antal personer: </label>
        <input
          required
          name="numberOfGuests"
          type="number"
          min="1"
          max="6"
          onChange={setGuests}
        ></input>
        
      </form>
      <button onClick={checkFreeTables}>Sök tider</button>

      
      {bookTableDiv}
      {userForm}
    </div>
  );

  if (!showBookingDiv) {
    bookingDiv = (<div>
      <p>Tack för din bokning!</p>
      <p>Du har bokat bord den {bookingInfo.date}, klockan {bookingInfo.time} för {bookingInfo.numberOfGuests} personer.</p>
    </div>);
  }

  return <div>{bookingDiv}</div>;
}
