import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { resId, url } from "../services/createRestaurant";
import { RestaurantBooking } from "./Admin";
import { Button } from "./styledComponents/Button";

export class Customer {
  constructor(
    public name: string,
    public lastname: string,
    public email: string,
    public phone: string,
    public id?: string
  ) {}
}

//Function that counts number of booked tables. It needs one argument, a filter listed of bookings for the time and date of the booking too be changed
function countTables(listOfbookings: RestaurantBooking[]) {
  let bookedTables = 0;
  for (let i = 0; i < listOfbookings.length; i++) {
    bookedTables += Math.floor(Number(listOfbookings[i].numberOfGuests) / 6);
    if (Number(listOfbookings[i].numberOfGuests) % 6 !== 0) {
      bookedTables += 1;
    }
  }
  return bookedTables;
}

//Function that checks number of tables needed if a booking is changed, i needs 2 arguments, number of guests and number of tables booked.
//The number of tables booked is returned from the countTables function.
function canBeBooked(numberOfGuests: number, tablesBooked: number) {
  //Number of total tables in the resturant
  let numberOfTables = 15;
  //Checks how many full tables needed
  let tablesNeeded = Math.floor(Number(numberOfGuests) / 6);
  //Checks if any not full tables is needed
  if (Number(numberOfGuests) % 6 !== 0) {
    tablesNeeded += 1;
  }
  //checks if there is enough tables available for booking
  if (numberOfTables - tablesBooked < tablesNeeded) {
    return false;
    console.log("För få lediga bord");
  }
  return true;
}

export const AdminDetails = () => {
//useStates and useEffects
  const [bookings, setBookings] = useState<RestaurantBooking[]>([]);
  const [booking, setBooking] = useState<RestaurantBooking>();
  const [customer, setCustomer] = useState<Customer>();
  const [customerID, setCustomerID] = useState(0);
  //Contains booking for editing
  const [editBooking, setEditBooking] = useState<RestaurantBooking>();
  const [editUser, setEditUser] = useState<Customer>();
  //Toggles the editform
  const [showForm, setShowForm] = useState(false);
  //Toggles the userform
  const [showUserForm, setShowUserForm] = useState(false);
  //Boolean to check if an edit is ready to send to API
  const [editOK, setEditOK] = useState(false);
  //Toggles delete booking check
  const [showDeleteBooking, setShowDeleteBooking] = useState(false);
  //Toggles main div content
  const [showMainDiv, setShowMainDiv] = useState(true);

  let { id } = useParams<string>();

  useEffect(() => {
    if (customerID === 0) return;
  }, [customerID]);

  useEffect(() => {
    if (id) {
      return setCustomerID(+id);
    }
  }, [id]);

  useEffect(() => {
    //Fetches bookings from API
    axios
      .get<RestaurantBooking[]>(url + "booking/restaurant/" + resId)
      .then((response) => {
        let bookingsFromAPI = response.data.map(
          (booking: RestaurantBooking) => {
            return new RestaurantBooking(
              booking._id,
              booking.date,
              booking.time,
              booking.numberOfGuests,
              booking.customerId
            );
          }
        );
        setBookings(bookingsFromAPI);
      });
  }, []);

  useEffect(() => {
    if (booking !== undefined) return;
    axios.get(url + "booking/" + id).then((response) => {
      const bookingAPI: RestaurantBooking = response.data[0];
      setBooking(bookingAPI);
      axios.get(url + "customer/" + bookingAPI.customerId).then((response) => {
        const customerAPI: Customer = response.data[0];
        setCustomer(customerAPI);
      });
    });
  }, [booking, id]);

//Functions
  //Shows the edit form
  function showEditForm() {
    setShowForm(true);
    setEditBooking(booking);
  }
  //Hides the edit form
  function hideEditForm() {
    setShowForm(false);
  }
  //Shows the edit user form
  function showEditUserForm() {
    setShowUserForm(true);
    setEditBooking(booking);
    setEditUser(customer);
  }
  function hideEditUserForm() {
    setShowUserForm(false);
  }
  //Function that checks if there is available tables after editing booking
  function checkFreeTables() {
    if (editBooking === undefined) {
      return;
    }
    // Removes the bookings we are chaning from the list of bookings.
    // This makes the count of free tables accurate. 
    for (let i = 0; i < bookings.length; i++){
      if(bookings[i]._id === editBooking._id){
        bookings.splice(i,1);
      };    
    };
    //creates a filtred list for the date of the edited booking
    let bookedTables = bookings.filter((x) => x.date === editBooking.date);
    //Finds the objekt in bookings that matches the booking we're editing
    let thisBooking = bookings.find((x) => x._id === editBooking._id);

    //Checks if number of guests is increased
    // if (
    //   Number(thisBooking?.numberOfGuests) < Number(editBooking.numberOfGuests)
    // ) {
      //Sets the editOK to true or false by checking if there is enough tables
      setEditOK(
        canBeBooked(
          Number(editBooking.numberOfGuests),
          countTables(bookedTables.filter((x) => x.time === editBooking.time))
        )       
      );
      console.log(editOK);
    // }
    // //if the number of guests is decreased no table check is needed
    // else {
    //   setEditOK(true);
    // };
  };

  //Saves and sends edited booking to API
  function saveChanges() {
    //Makes sure that a booking for editing is set
    if (editBooking === undefined) {
      return;
    }
    //The booking with the edited values.
    let updatedBooking: RestaurantBooking = {
      _id: editBooking._id,
      id: editBooking._id,
      restaurantId: resId,
      customerId: editBooking.customerId,
      date: editBooking.date,
      time: editBooking.time,
      numberOfGuests: editBooking.numberOfGuests,
    };
    //Checks that a changed booking can be made
    if (editOK === true) {
      console.log("uppdaterar bokning");
      //sends updated booking to API
      axios
        .put(url + "booking/update/" + updatedBooking._id, updatedBooking)
        .then((response) => {
          console.log(response.data);
        });
      //Renders the changes   
      setBooking(updatedBooking);
      //hides form and save button
      setEditOK(false);
      setShowForm(false);
    }
    //If the changed booking cant be made because of not enough available tables.
    else {
      console.log(
        "Det finns inga lediga bord för den här ändringen, försök med en annan dag eller tid"
      );
    };
  };

  //Saves and sends edited customer to API
  function saveUserChanges() {
    if (editUser === undefined || editBooking === undefined) {
      return;
    }
    //The edited customer
    let updatedCustomer: Customer = {
      id: editBooking.customerId,
      name: editUser.name,
      lastname: editUser.lastname,
      email: editUser.email,
      phone: editUser.phone,
    };
    //Sends updated customer to api
    axios
      .put(url + "customer/update/" + updatedCustomer.id, updatedCustomer)
      .then((response) => {
        console.log(response.data);
      });
    //Renders updates  
    setCustomer(updatedCustomer);
    //Hides edit form
    setShowUserForm(false);
  }
  //shows the deletebooking check
  function deleteBookingCheck() {
    setShowDeleteBooking(true);
    setEditBooking(booking);
  }

  //function to delete booking from API
  function deleteBooking() {
    //Renders that the booking is deleted
    setShowMainDiv(false);
    if (editBooking === undefined) {
      return;
    };
    //Deletes booking from API
    axios.delete(url + "booking/delete/" + editBooking._id).then((response) => {
    });
    console.log("Bokning borttagen");
  };

  //Hides delete booking check
  function cancelDeleteBooking() {
    setShowDeleteBooking(false);
  };

 
//Anonymous functions that targets values changed in forms.
  //Gets the changed date value and sets the new value to the booking
  const setDateChecked = (e: ChangeEvent<HTMLInputElement>) => {
    let newDate = e.target.value;
    if (newDate === undefined || editBooking === undefined) {
      return;
    }
    setEditBooking({ ...editBooking, date: newDate });
  };
  //Gets the changed time value and sets the new value to the booking
  const setTimeChecked = (e: ChangeEvent<HTMLInputElement>) => {
    let newTime = e.target.value;
    if (newTime === undefined || editBooking === undefined) {
      return;
    }
    setEditBooking({ ...editBooking, time: newTime });
  };
  //Gets the changed number of guest value and sets the new value to the booking
  const setGuests = (e: ChangeEvent<HTMLInputElement>) => {
    let newNumberOfGuests = e.target.value;
    if (newNumberOfGuests === undefined || editBooking === undefined) {
      return;
    }
    setEditBooking({ ...editBooking, numberOfGuests: newNumberOfGuests });
  };
  const setName = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.value;

    if (name === undefined || editUser === undefined) {
      return;
    }
    setEditUser({ ...editUser, name: name });
  };
  const setLastName = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.value;

    if (name === undefined || editUser === undefined) {
      return;
    }
    setEditUser({ ...editUser, lastname: name });
  };
  const setEmail = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.value;

    if (name === undefined || editUser === undefined) {
      return;
    }
    setEditUser({ ...editUser, email: name });
  };
  const setPhone = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.value;

    if (name === undefined || editUser === undefined) {
      return;
    }
    setEditUser({ ...editUser, phone: name });
  };

//Variables with HTML as value
  
  let deleteBookingControl = <></>;
  if (showDeleteBooking) {
    deleteBookingControl = (
      <div>
        <p>Bekräfta ta bort bokning</p>
        <button onClick={deleteBooking}>Bekräfta</button>
        <button onClick={cancelDeleteBooking}>Avbryt</button>
      </div>
    );
  }

  let saveBtn = (<></>)
  if (editOK){
    saveBtn = <button onClick={saveChanges}>Spara ändringar</button>
  }

  //The editform is only shown if the showForm value is true
  let editForm = <></>;
  if (showForm) {
    editForm = (
      <div>
        <form>
          <input type="date" onChange={setDateChecked} />
          <label htmlFor="time">18.00</label>
          <input
            type="radio"
            name="time"
            value="18.00"
            onChange={setTimeChecked}
          />
          <label htmlFor="time">21.00</label>
          <input
            type="radio"
            name="time"
            value="21.00"
            onChange={setTimeChecked}
          />
          <input
            name="numberOfGuests"
            type="number"
            min="1"
            max="90"
            onChange={setGuests}
          ></input>
        </form>
        <button onClick={checkFreeTables}>kontrollera lediga bord</button>
        <button onClick={hideEditForm}>Avbryt</button>
        {saveBtn}
      </div>
    );
  }

  let editUserForm = <></>;
  if (showUserForm) {
    editUserForm = (
      <div>
        <form>
          <input type="text" placeholder="Förnamn" onChange={setName} />
          <input type="text" placeholder="Efternamn" onChange={setLastName} />
          <input type="text" placeholder="Email" onChange={setEmail} />
          <input type="text" placeholder="Telefon" onChange={setPhone} />
        </form>
        <button onClick={saveUserChanges}>Spara ändringar</button>
        <button onClick={hideEditUserForm}>Avbryt</button>
      </div>
    );
  }

  let bookingHTML = (
    <ul>
      <li>Boknings id: {id}</li>
      <li>Datum: {booking?.date}</li>
      <li>Tid: {booking?.time}</li>
      <li>Antal gäster: {booking?.numberOfGuests}</li>
      <button className="changeBtn" onClick={showEditForm}>
        Ändra bokning
      </button>
      <button className="deleteBtn" onClick={deleteBookingCheck}>
        Ta bort bokning
      </button>
      {deleteBookingControl}
      {editForm}
    </ul>
  );

  let customerHTML = (
    <ul className="bookingInList">
      <li>KundId: {booking?.customerId}</li>
      <li>Förnamn: {customer?.name}</li>
      <li>Efternamn: {customer?.lastname}</li>
      <li>Email: {customer?.email}</li>
      <li>Telefonnr: {customer?.phone}</li>
      <button className="changeBtn" onClick={showEditUserForm}>
        Ändra kunduppgifter
      </button>
      {editUserForm}
    </ul>
  );

  let adminDetailsDiv = (<div>
    <Link className="linkBackToBookings" to="/Admin">
      Tillbaka till bokningar
    </Link>
    {bookingHTML}
    {customerHTML}
  </div>)
  if(!showMainDiv){
    adminDetailsDiv = (<div>
      <p>Bookning med id: {id} är borttagen</p>
      <Link className="linkBackToBookings" to="/Admin">
      Tillbaka till bokningar
      </Link>
    </div>)
  }

  return (
    <>
      {adminDetailsDiv}
    </>
  );
};
