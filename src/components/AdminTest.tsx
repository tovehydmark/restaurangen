//Created a new component to test out this code for admin aswell. We can decided as a group what we think works best.
//Put and Delete is also implemented here

import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";


//RestaurantBooking class containing all objectkeys from API when fetching bookings + a customer object and the resturant id.
//The customer object is fetch throug anoter get from API
//The resturant id is only needed when changing or deleteing a booking, hence its not required
export class RestaurantBooking {
  constructor(
    public id: string,
    public date: string,
    public time: string,
    public numberOfGuests: string,
    public customerId: string,
    public customer?: Customer,
    public restaurantId?: string
  ){}
}

//The Customer class containing all objectkeys from API when fetching a customer.
export class Customer{
  constructor(
    public name: string,
    public lastname: string,
    public email: string,
    public phone: string,
    public id?: string,
  ){}
}

//Bookings interface
export interface IBookings {
  _id: string;
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: string;
  customerId: string;
  customer: Customer;
}


//Function that checks number of tables needed if a booking is changed, i needs 2 arguments, number of guests and number of tables booked.
//The number of tables booked is returned from the countTables function.
function canBeBooked(numberOfGuests: number, tablesBooked: number) {
  //Number of total tables in the resturant
  let numberOfTables = 15;

  //Checks how many full tables needed
  let tablesNeeded = Math.floor(Number(numberOfGuests) / 6);
  //Checks if any not full tables is needed
  if (Number(numberOfGuests) % 6 != 0) {
    tablesNeeded += 1;
  }

  //checks if there is enough tables available for booking
  if (numberOfTables - tablesBooked < tablesNeeded) {
    console.log("Det finns inga lediga bord");
    return false;
  }
  console.log("Det finns lediga bord");

  return true;
};

//Function that counts number of booked tables. It needs one argument, a filter listed of bookings for the time and date of the booking too be changed
function countTables(listOfbookings: RestaurantBooking[]) {
  let bookedTables = 0;
  for (let i = 0; i < listOfbookings.length; i++) {
    bookedTables += Math.floor(Number(listOfbookings[i].numberOfGuests) / 6);
    if (Number(listOfbookings[i].numberOfGuests) % 6 != 0) {
      bookedTables += 1;
    }
  }
  return bookedTables;
};

export function AdminTest() {
  //List of bookings fetched from API
  const [bookings, setBookings] = useState<RestaurantBooking[]>([]);
  //Contains booking for editing
  const [editBooking, setEditBooking] = useState<RestaurantBooking>();

  const [editUser, setEditUser] = useState<Customer>();
  //Toggles the editform
  const [showForm, setShowForm] = useState(false);
  //Toggles the userform
  const [showUserForm, setShowUserForm] = useState(false);
  //Boolean to check if an edit is ready to send to API
  const [editOK, setEditOK] = useState(false);

  const [showDeleteBooking, setShowDeleteBooking] = useState(false);
  
  //The resturant id
  let resId = "624c1940850953b8ad161715"
  //The base url for API
  let url = "https://school-restaurant-api.azurewebsites.net/"
   
  
  
  useEffect(() => {
    //Fetches bookings from API
    axios
      .get<IBookings[]>(
        url+"booking/restaurant/" +
          resId
      )
      .then((response) => {
        //For every booking fetched, fetch the associated customer
        response.data.map((b: IBookings) => {
          axios.get(url+"customer/" +
          b.customerId).then((response) => {
            let customerAPI = response.data[0]
            //Creates a list of bookings with the associated customer object.
            //every time setBookings is set it keeps the old values in the list and adds the new one.
             setBookings(x => [...x,new RestaurantBooking(
              b._id,
              b.date,
              b.time,
              b.numberOfGuests,
              b.customerId,
              customerAPI
            )])
          })
        });
      });
  }, []);
  
  //Shows the edit form
  function showEditForm(booking: RestaurantBooking){
    setShowForm(true);
    setEditBooking(booking)
  };
  
  //Hides the edit form
  function hideEditForm(){
    setShowForm(false)
    
  };

  //Shows the edit user form
  function showEditUserForm(booking: RestaurantBooking){
    setShowUserForm(true);
    setEditBooking(booking);
    setEditUser(booking.customer);
  };

  function hideEditUserForm(){
    setShowUserForm(false);
  }

  //Function that checks if there is available tables after editing booking
  function checkFreeTables(editBooking: RestaurantBooking){
    //creates a filtred list for the date of the edited booking
    let bookedTables = bookings.filter((x) => x.date === editBooking.date);
    //creates a filtred list for the time of the edited booking
    let thisBooking = bookings.find((x) => x.id === editBooking.id)

    //Checks if number of guests is increased
    if(Number(thisBooking?.numberOfGuests)<Number(editBooking.numberOfGuests)){
      //Sets the editOK to true or false by checking if there is enough tables
      console.log("hej");
        
      setEditOK(canBeBooked(Number(editBooking.numberOfGuests)-Number(thisBooking?.numberOfGuests),countTables(bookedTables.filter((x)=> x.time === editBooking.time))));
    }
    //if the number of guests is decreased no table check is needed
    else{
      setEditOK(true)
    };
  };

  //Checks if a edited booking can be saved and sent to API
  function saveChanges(){
    //Makes sure that a booking for editing is set
    if(editBooking === undefined){
      return
    };

    //The booking with the edited values.
    let updatedBooking:RestaurantBooking = {id:editBooking.id, restaurantId:resId, customerId:editBooking.customerId, date:editBooking.date, time:editBooking.time, numberOfGuests:editBooking.numberOfGuests};
    console.log(JSON.stringify(updatedBooking));
    checkFreeTables(editBooking)

    //Checks that a changed booking can be made
    if(editOK === true){
      axios.put(url+"booking/update/"+updatedBooking.id, updatedBooking).then((response)=>{
        console.log(response.data);
      });
    }
    //If the changed booking cant be made because of not enough availble tables.
    else{
      console.log("Det finns inga lediga bord för den här ändringen");
    };
  };

  function saveUserChanges(){
    if(editUser === undefined || editBooking === undefined){
      return
    };

    let updatedCustomer:Customer = {id:editBooking.customerId, name:editUser.name, lastname:editUser.lastname, email:editUser.email, phone:editUser.phone};
    console.log(JSON.stringify(updatedCustomer));
    axios.put(url+"customer/update/"+updatedCustomer.id,updatedCustomer).then((response) =>{
      console.log(response.data);
    });
  };

  function deleteBookingCheck(booking:RestaurantBooking){
    setShowDeleteBooking(true);
    setEditBooking(booking);
  }

  function deleteBooking(){
    setShowDeleteBooking(false);
    if(editBooking === undefined){
      return
    }
    axios.delete(url+"booking/delete/"+editBooking.id).then((response) => {
      console.log(response +"Bokning borttagen");
    })
  }

  function cancelDeleteBooking(){
    setShowDeleteBooking(false);
  }


  //Gets the changed date value and sets the new value to the booking
  const setDateChecked = (e: ChangeEvent<HTMLInputElement>) => {
    let newDate = e.target.value;
    if(newDate === undefined || editBooking === undefined){
      return
    };
    setEditBooking({...editBooking, date:newDate});
  };
  
  //Gets the changed time value and sets the new value to the booking
  const setTimeChecked = (e: ChangeEvent<HTMLInputElement>) =>{
    let newTime = e.target.value;
    if(newTime === undefined || editBooking === undefined){
      return
    };
    setEditBooking({...editBooking, time:newTime});
  };

  //Gets the changed number of guest value and sets the new value to the booking
  const setGuests = (e: ChangeEvent<HTMLInputElement>) =>{
    let newNumberOfGuests = e.target.value;

    if(newNumberOfGuests === undefined || editBooking === undefined){
      return
    };
    setEditBooking({...editBooking, numberOfGuests:newNumberOfGuests})
  };

  const setName = (e: ChangeEvent<HTMLInputElement>) =>{
    let name = e.target.value;

    if(name === undefined || editUser === undefined){
      return
    };
    setEditUser({...editUser, name:name });
  };

  const setLastName = (e: ChangeEvent<HTMLInputElement>) =>{
    let name = e.target.value;

    if(name === undefined || editUser === undefined){
      return
    };
    setEditUser({...editUser, lastname:name });
  };

  const setEmail = (e: ChangeEvent<HTMLInputElement>) =>{
    let name = e.target.value;

    if(name === undefined || editUser === undefined){
      return
    };
    setEditUser({...editUser, email:name });
  };

  const setPhone = (e: ChangeEvent<HTMLInputElement>) =>{
    let name = e.target.value;

    if(name === undefined || editUser === undefined){
      return
    };
    setEditUser({...editUser, phone:name });
  };

  let deleteBookingControl = (<></>)
  if(showDeleteBooking){
    deleteBookingControl = (<div>
      <p>Bekräfta ta bort bokning</p>
      <button onClick={deleteBooking}>Bekräfta</button>
      <button onClick={cancelDeleteBooking}>Avbryt</button>
    </div>)
  }

  //The editform is only shown if the showForm value is true
  let editForm = (<></>)
  if(showForm){
    editForm = (<div><form>
      <input type="date" onChange={setDateChecked}/>
      <label htmlFor="time">18.00</label>
      <input type="radio" name="time" value="18.00"  onChange={setTimeChecked}/>
      <label htmlFor="time">21.00</label>
      <input type="radio" name="time" value="21.00"  onChange={setTimeChecked}/>
      <input name="numberOfGuests" type="number" min="1" max="90" onChange={setGuests}></input>
    </form>
    <button onClick={saveChanges}>Spara ändringar</button>
    <button onClick={hideEditForm}>Avbryt</button></div>)
  };

  let editUserForm = (<></>)
  if(showUserForm){
    editUserForm =(<div>
      <form>
        <input type="text" placeholder="Förnamn" onChange={setName} />
        <input type="text" placeholder="Efternamn" onChange={setLastName} />
        <input type="text" placeholder="Email" onChange={setEmail} />
        <input type="text" placeholder="Telefon" onChange={setPhone} />
      </form>
      <button onClick={saveUserChanges}>Spara ändringar</button>
      <button onClick={hideEditUserForm}>Avbryt</button>
    </div>)
  }

  //Maps out the bookings with customer in a rendered list.
  let lis = bookings.map((booking) =>{
    return (<ul className="bookingInList">
      <li>Boknings id: {booking.id}</li>
      <li>Kund id: {booking.customerId }</li>
      <li>Datum: {booking.date}</li>
      <li>Tid: {booking.time}</li>
      <li>Antal gäster: {booking.numberOfGuests}</li>
      <button onClick={(e) => showEditForm(booking)}>Ändra bokning</button>
      <button onClick={(e) => deleteBookingCheck(booking)}>Ta bort bokning</button>
      {deleteBookingControl}
      {editForm}
      <ul className="customerInList">
      <li>Förnamn: {booking.customer?.name}</li>
      <li>Efternamn: {booking.customer?.lastname}</li>
      <li>Email: {booking.customer?.email}</li>
      <li>Telefon: {booking.customer?.phone}</li>
      </ul>
      <button onClick={(e) => showEditUserForm(booking)}>Ändra kunduppgifter</button>
      {editUserForm}
    </ul>)
  })
  
  return (<div>{lis}</div>);
}
