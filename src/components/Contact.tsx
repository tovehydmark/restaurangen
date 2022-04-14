import axios from "axios";
import { useEffect, useState } from "react";

export function Contact() {
  const [getAddress, setGetAddress] = useState<any[]>([]);

  useEffect(() => {
    async function fetchAddress() {
      const URL = `https://school-restaurant-api.azurewebsites.net/restaurant/624c1940850953b8ad161715`;
      try {
        const res = await axios.get(URL);
        setGetAddress(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAddress();
  }, []);

  return (
    <div>
      <h2>Kontakt</h2>
      {getAddress.map((address) => (
        <div>
          <p>
            {address.address}
            <br />
            {address.zip}
            <br />
            {address.city}
            <br />
            Telefon: 070 123 45 67 Öppettider:
            <br />
            Mån-Tors: 11.00 - 22.00
            <br />
            Fre-Sön: 11.00 - 23.00
          </p>
        </div>
      ))}
    </div>
  );
}
