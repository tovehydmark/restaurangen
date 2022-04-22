import axios from "axios";

export let url = "https://school-restaurant-api.azurewebsites.net/";
export let resId = "624c1940850953b8ad161715";
//RestaurangID:
// 624c1940850953b8ad161715

export function createRestaurant() {
  axios
    .post(url + "restaurant/create", {
      name: "The Codfather",
      address: {
        street: "Laxgatan 14",
        zip: "13579",
        city: "Torskhamn",
      },
    })
    .then((response) => {
      // console.log(response.data);
    });
}
