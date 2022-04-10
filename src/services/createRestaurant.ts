import axios from "axios";

export function createRestaurant() {
  axios
    .post("https://school-restaurant-api.azurewebsites.net/restaurant/create", {
      name: "The Codfather",
      address: {
        street: "Laxgatan 14",
        zip: "13579",
        city: "Torskhamn",
      },
    })
    .then((response) => {
      console.log(response.data);
    });
}

//RestaurangID
//Vi använder oss av id:t som slutar på 15! (Råkade skapa ett till senare)

// 624c1940850953b8ad161715

//https://school-restaurant-api.azurewebsites.net/restaurant/624c1940850953b8ad161715
