import { ChangeEvent, useState } from "react";
import Calendar from "react-calendar";
// Skrev in interface här sålänge, men kanske kan vara värt att ha en modelsmapp med interfaces?
interface INewUser {
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
}

export function Booking() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [newUser, setNewUser] = useState<INewUser>({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
  });
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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    setNewUser({ ...newUser, [name]: e.target.value });
  };

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

  console.log(newUser);
  console.log(time);
  console.log(date);

  return (
    <div>
      {/* <Calendar onChange={getFreeTables} value={date} /> */}
      <label htmlFor="date">Välj datum: </label>
      <input
        type="date"
        name="date"
        min={todaysDateToString}
        onChange={setDateChecked}
      ></input>

      <label htmlFor="numberOfGuests">Antal personer: </label>
      <input name="numberOfGuests" type="number" min="1" max="90"></input>

      <form>
        <input
          type="radio"
          name="time"
          value="18.00"
          onChange={setTimeChecked}
        />
        <label htmlFor="time">18.00</label>
        <input
          type="radio"
          name="time"
          value="21.00"
          onChange={setTimeChecked}
        />
        <label htmlFor="time">21.00</label>
      </form>

      <form>
        <label htmlFor="firstname">Förnamn: </label>
        <input
          placeholder="Förnamn"
          type="text"
          name="firstname"
          value={newUser.firstname}
          onChange={handleChange}
        />

        <label htmlFor="lastname">Efternamn: </label>
        <input
          placeholder="Efternamn"
          type="text"
          name="lastname"
          value={newUser.lastname}
          onChange={handleChange}
        />

        <label htmlFor="email">Email: </label>
        <input
          placeholder="email@somedomain.com"
          name="email"
          type="email"
          value={newUser.email}
          onChange={handleChange}
        />

        <label htmlFor="phonenumber">Telefonummer: </label>
        <input
          placeholder="070-0000000"
          type="text"
          name="phonenumber"
          value={newUser.phonenumber}
          onChange={handleChange}
        />

        <button>Boka</button>
      </form>
    </div>
  );
}
