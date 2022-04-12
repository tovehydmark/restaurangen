import "../style/style.scss";
import axios from "axios";
import { useEffect, useState } from "react";




//[{"_id":"624c1940850953b8ad161715","name":"The Codfather","address":"Laxgatan 14","zip":"13579","city":"Torskhamn"}]

interface IContactInformation {
  _id:string;
  name:string;
  address:string;
  zip:number;
  city:string;
  }


export function Contact() {

  const [address, getAddress] = useState<IContactInformation>()
  useEffect(() => {
    axios.get(`https://school-restaurant-api.azurewebsites.net/restaurant/624c1940850953b8ad161715`).then(res=>{
    
    getAddress(res.data)
    //console.log(res.data)
    //console.log()
     })
  }, []);

  useEffect(() => {
    getAddress(address);
  }, []);

  
    
  let contactInformation = address 

  return (
    <section>

    <ul>
      <li>{address?.city}</li>
    </ul>

    <h4>Öppettider:</h4>
    <article>
      <p>
        
        Mån-Tors: 11.00 - 22.00
        <br />
        Fre-Sön: 11.00 - 23.00
      </p>
    </article>
  </section>
   
  );
}


/*

   {address.map(item => (
          <span key={item._id}> {item.name}</span>
        ))}
    <h2>Kontakt</h2>
    <ul>
      {address.map(item => (
        <li key={item._id}>
          <span>{item.name}</span>
        </li>
      ))}
    </ul>

    <section>
    
    <h2>Kontakt</h2>
    <article>
    <p>
      Laxgatan 14
      <br />
      135 79
      <br />
      Torskhamn
    </p>
    </article>
    <h4>Öppettider:</h4>
    <article>
      <p>
        Mån-Tors: 11.00 - 22.00
        <br />
        Fre-Sön: 11.00 - 23.00
      </p>
    </article>
  </section>
  */


  /*
  const [loading, setLoading] = useState<boolean>(false);
    const [address, getAddress] = useState<InterfaceAddress>()
  useEffect(() => {
    setLoading(true)
    axios.get(`https://school-restaurant-api.azurewebsites.net/restaurant/624c1940850953b8ad161715`).then(res=>{
      setLoading(false)
    console.log(res)
    getAddress(res.data)
    console.log(address)
     })
  }, [])
  */

   /* useEffect(() => {
    axios.get(`https://school-restaurant-api.azurewebsites.net/restaurant/624c1940850953b8ad161715`)
    .then(res => {
      const address = res.data;
    //  this.setState({ address });})
    console.log(res)}
  },[]) */

  /*
   let bookingInformation = bookingInfo.map((booking, i) => {
    return (
      <div key={i} className="bookingDetails">
        <ul>
          <li>Bokningsid: {booking.id}</li>
          <li>Kundid: {booking.customerId}</li>
          <li>Datum: {booking.date}</li>
          <li>Tid: {booking.time}</li>
          <li>Antal gäster: {booking.numberOfGuests}</li>
        </ul>
        <button>Ändra kunduppgifter</button>
      </div>
    );
  });
  */
/*
  let addressInfo = address.map((address, i) =>{
    return (
      <div key={i}>
        <ul>
          <li>{address.name}</li>
        </ul>
      </div>
    )
  })
*/
