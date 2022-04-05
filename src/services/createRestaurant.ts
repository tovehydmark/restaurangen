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
// 624c1940850953b8ad161715

// 624c1940850953b8ad161716
