import { ChangeEvent, useEffect, useState } from "react";
import Calendar from "react-calendar"
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"
import axios from "axios";
// Skrev in interface här sålänge, men kanske kan vara värt att ha en modelsmapp med interfaces?
interface INewUser {
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
}

interface INewBookning {
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: string;
  customer: INewUser;
}

interface IFormInputs {
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  GDPR: boolean;
}

interface IBookings {
  id: string;
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: string;
  customerId: string;
}

class Bookings {
  constructor(public date: string, public time: string, public numberOfGuests: string){}
}

export function Booking() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');
  // const [newUser, setNewUser] = useState<INewUser>({
  //   firstname: "",
  //   lastname: "",
  //   email:"",
  //   phonenumber: ""
  // })
  const [bookings, setBookings] = useState<Bookings[]>([]);

  useEffect(() => {
    axios.get<IBookings[]>('https://school-restaurant-api.azurewebsites.net/booking/restaurant/' + resId)
    .then(response => {
      let bookingsFromAPI = response.data.map((bookings: IBookings) =>{
        console.log(bookings);
        
        return new Bookings(bookings.date, bookings.time, bookings.numberOfGuests)
      });
      setBookings(bookingsFromAPI)
    });
  }, []);
  
console.log(bookings);



  //React-form-hook tar emot data från inputfält vid submit
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<IFormInputs>({
    criteriaMode: "all"
  });
  
  
  let resId = "624c1940850953b8ad161715";
  let newBooking: INewBookning = {restaurantId:'', date:'', time:'', numberOfGuests:'', customer: {firstname:'', lastname:'', email: '', phonenumber: ''}};
  let yearToString = '';
  let monthToString = '';
  let dayToString = '';
  let todaysDate = new Date();
  let todaysDateToString = ''

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
  function dateToString(value: Date){
    if (value.getDate() < 10){
      dayToString = '-0' + value.getDate().toString();
    }
    else{
      dayToString ='-' + value.getDate().toString();
    }
    
    if(value.getMonth() +1 < 10){
      monthToString = '-0' + ((value.getMonth()+1).toString());
    }
    else {
      monthToString = '-' + ((value.getMonth()+1).toString());
    }
    yearToString = value.getFullYear().toString();

    todaysDateToString = yearToString + monthToString + dayToString
  }

  dateToString(todaysDate)

  //Skapar en ny användare genom att hämta värden från formulär
  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   let name = e.target.name;
  //   setNewUser({...newUser, [name]: e.target.value})
  // }

  //Kontrollerar och uppdaterar vald tid för bokning
  const setTimeChecked = (e: ChangeEvent<HTMLInputElement>) => {
    let time = e.target.value;
    setTime(time);
  }

  //Kontrollerar och uppdaterar vald dag för bokning
  const setDateChecked = (e: ChangeEvent<HTMLInputElement>) => {
    let date = e.target.value;
    setDate(date);
  }
  //Kontrollerar och uppdaterar antal gäster
  const setGuests = (e: ChangeEvent<HTMLInputElement>) => {
    let guests = e.target.value;
    setNumberOfGuests(guests);
  }
  //Kontrollerar och uppdaterar användaren, skapar objekt för ny bokning som ska skickas till API
  const onSubmit = (user: IFormInputs) => {
    newBooking = {restaurantId:resId, date:date, time:time, numberOfGuests: numberOfGuests, customer: user};
    sendBooking(newBooking);
  }

  function sendBooking(createBooking:INewBookning) {
    console.log(createBooking);
    
    axios.post('https://school-restaurant-api.azurewebsites.net/booking/create', createBooking).then(response => {console.log(response.data)});
  }
    
  return <div className="bookingDiv">
    <form className="bookingSearchForm">
      <label htmlFor="date">Välj datum: </label>
      <input required type="date" name="date" min={todaysDateToString} onChange={setDateChecked}></input>

      <label htmlFor="numberOfGuests">Antal personer: </label>
      <input required name="numberOfGuests" type="number" min="1" max="6" onChange={setGuests}></input>
    </form>

    <form className="bookingUserForm" onSubmit={handleSubmit(onSubmit)}>
      <label>Välj tid:</label>
      <div className="bookingTimesDiv">
        <div className="bookingRadioInput1">
          <input required type="radio" name="time" value="18.00" onChange={setTimeChecked}  />
          <label htmlFor="time">18.00</label>
        </div>

        <div className="bookingRadioInput2">
          <input className="bookingRadioInput2" required type="radio" name="time" value="21.00"  onChange={setTimeChecked} />
          <label htmlFor="time">21.00</label>
        </div>
      </div>

      <label htmlFor="firstname">Förnamn: </label>
      <input placeholder="Sven" {...register("firstname", {
        required: "Du måste fylla i förnamn",
        pattern: {
          value: /^[A-Za-z]+$/i,
          message: "Får bara innehålla bokstäver"
        },
        minLength: {
          value: 2,
          message: "Fältet innehåller för få tecken"
        }

      })} />

      <ErrorMessage
        errors={errors}
        name="firstname"
        render={({ messages }) => {
          console.log("messages", messages);
          return messages
            ? Object.entries(messages).map(([type, message]) => (
                <p className="errorMessage" key={type}>{message}</p>
              ))
            : null;
        }}
      />

      <label htmlFor="lastname">Efternamn: </label>
      <input placeholder="Svensson" {...register("lastname", {
              required: "Du måste fylla i efternamn",
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Får bara innehålla bokstäver"
              },
              minLength: {
                value: 2,
                message: "Fältet innehåller för få tecken"
              }

            })} />

            <ErrorMessage
              errors={errors}
              name="lastname"
              render={({ messages }) => {
                console.log("messages", messages);
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p className="errorMessage" key={type}>{message}</p>
                    ))
                  : null;
              }}
            />

      <label htmlFor="email">Email: </label>
      <input placeholder="sven@domän.se" {...register("email", {
              required: "Du måste fylla i email",
              pattern: {
                value:/^[A-Za-z0-9_-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                message: "Måste vara en emailadress"
              },
              minLength: {
                value: 5,
                message: "Fältet innehåller för få tecken"
              }

            })} />

            <ErrorMessage
              errors={errors}
              name="email"
              render={({ messages }) => {
                console.log("messages", messages);
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p className="errorMessage" key={type}>{message}</p>
                    ))
                  : null;
              }}
            />

      <label htmlFor="phonenumber">Telefonnummer: </label>
      <input placeholder="0700000000" {...register("phonenumber", {
              required: "Du måste fylla i telefonnummer",
              pattern: {
                value:/^[0-9]+$/i,
                message: "Fältet får endast innehålla siffror"
              },
              minLength: {
                value: 5,
                message: "Fältet innehåller för få tecken"
              }

            })} />

            <ErrorMessage
              errors={errors}
              name="phonenumber"
              render={({ messages }) => {
                console.log("messages", messages);
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p className="errorMessage" key={type}>{message}</p>
                    ))
                  : null;
              }}
            />

      <div className="gdpr">
      <label htmlFor="GDPR">Jag godkänner att The Codfather får lagra och använda mina personuppgifter enligt GDPR</label>
      <input type="checkbox" {...register("GDPR", {
        required: "Du måste godkänna hantering av personuppgifter för att kunna boka"
      })}/>
      <ErrorMessage
              errors={errors}
              name="GDPR"
              render={({ messages }) => {
                console.log("messages", messages);
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p className="errorMessage" key={type}>{message}</p>
                    ))
                  : null;
              }}/>
      </div>
      
      <input className="bookingBtn" type="submit" />
    </form>
    
  </div>;
 {/* <Calendar onChange={getFreeTables} value={date} /> */}
  /* <form>
      <label htmlFor="firstname">Förnamn: </label>
      <input 
      placeholder="Förnamn" 
      type="text" 
      name="firstname" 
      value={newUser.firstname} 
      onChange={handleChange} />

      <label htmlFor="lastname">Efternamn: </label>
      <input 
      placeholder="Efternamn" 
      type="text" name="lastname" 
      value={newUser.lastname} 
      onChange={handleChange} />

      <label htmlFor="email">Email: </label>
      <input 
      placeholder="email@somedomain.com" 
      name="email" 
      type="email" 
      value={newUser.email} 
      onChange={handleChange} />

      <label htmlFor="phonenumber">Telefonummer: </label>
      <input 
      placeholder="070-0000000" 
      type="text" 
      name="phonenumber" 
      value={newUser.phonenumber} 
      onChange={handleChange} />

      <label htmlFor="GDPR">Jag godkänner att The Codfather får lagra och använda mina personuppgifter enligt GDPR </label>
      
      <button>Boka</button>
    </form> */
}
