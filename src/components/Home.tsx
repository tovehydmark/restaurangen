import "../style/style.scss";
// import { createRestaurant } from "../services/createRestaurant";
import fishImg from "../images/fishfood.png";
import seafoodImg from "../images/seafood.png";
import tableImg from "../images/table.png";

//Images for slider
const imageSlides = [
  { image: fishImg },
  { image: seafoodImg },
  { image: tableImg },
];

export function Home() {
  //Create the restaurant by posting to API once
  // createRestaurant();

  return (
    <>
      <div className="slideWrap">
        <div className="photoContainer">
          {imageSlides.map((slide, i) => {
            return (
              <img
                className="photos"
                key={i}
                src={slide.image}
                alt="dining photos"
              />
            );
          })}
        </div>
      </div>
      <section className="startpageTextContainer">
        <h2>The CodFather</h2>
        <p>
          Blue gourami olive flounder dwarf gourami mummichog Blind shark
          northern pike. Freshwater hatchetfish, flat loach, Australian herring
          glassfish. Northern anchovy Razorback sucker golden trout frigate
          mackerel? Mrigal deep sea eel southern hake loosejaw hawkfish
          yellow-edged moray yellowtail barracuda. Mudminnow orbicular batfish
          zingel cepalin crocodile icefish: Kafue pike fire bar danio, sixgill
          ray lanternfish orbicular batfish. Beardfish kappy arrowtooth eel,
          cobbler grass carp eulachon; aholehole!
          <br /> Tadpole cod rough sculpin Blind shark mola duckbilled
          barracudina sandroller goldspotted killifish zebra tilapia grass carp.
          Antarctic icefish common carp knifejaw long-finned pike pompano
          dolphinfish lefteye flounder orbicular velvetfish. Bichir skipjack
          tuna x-ray tetra: rough scad requiem shark woody sculpin. Mudskipper,
          golden dojo. Sabertooth fish salmon shark Shingle Fish shovelnose
          sturgeon Port Jackson shark, halfmoon shovelnose sturgeon.
        </p>
      </section>
    </>
  );
}
