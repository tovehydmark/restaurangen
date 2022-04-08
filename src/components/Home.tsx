import "../style/style.scss";
import styled, { keyframes } from "styled-components";

// import { createRestaurant } from "../services/createRestaurant";
import fishImg from "../images/fishfood.jpg";
import seafoodImg from "../images/seafood.jpg";
import tableImg from "../images/table.jpg";

// STYLING (fixa keyframes sist) //
const changeBg = keyframes`
    0%{right: 0px;}
    10%{right: 0px;}
    20%{right: 1200px;}
    30%{right: 1200px}
    40%{right: 2400px;}
    50%{right: 2400px;}
    60%{right: 1200px}
    70%{right: 1200px;}
    80%{right: 0px;}
    90%{right: 0px;}
    100%{right: 0px}
`;
//kan flytta dessa till styled mapp när vi fått det att funka
export const Image = styled.img`
  position: relative;
  width: 3600px;
  height: 800px;
  animation: ${changeBg} 33s ease infinite running;
`;
export const DivImg = styled.div`
  display: flex;
  overflow: hidden;
  height: 800px;
`;
//flytta till egen fil?
const imageSlides = [
  { image: fishImg },
  { image: seafoodImg },
  { image: tableImg },
];

export function Home() {
  // createRestaurant();

  return (
    <>
      <DivImg>
        {imageSlides.map((slide, i) => {
          return <Image key={i} src={slide.image} alt="dining photos"></Image>;
        })}
      </DivImg>
      <section>
        <h2>The CodFather</h2>
        <p>
          Blue gourami olive flounder dwarf gourami mummichog Blind shark
          northern pike. Freshwater hatchetfish, flat loach, Australian herring
          glassfish. Northern anchovy Razorback sucker golden trout frigate
          mackerel? Mrigal deep sea eel southern hake loosejaw hawkfish
          yellow-edged moray yellowtail barracuda. Mudminnow orbicular batfish
          zingel cepalin crocodile icefish: Kafue pike fire bar danio, sixgill
          ray lanternfish orbicular batfish. Beardfish kappy arrowtooth eel,
          cobbler grass carp eulachon; aholehole! Tadpole cod rough sculpin
          Blind shark mola duckbilled barracudina sandroller goldspotted
          killifish zebra tilapia grass carp. Antarctic icefish common carp
          knifejaw long-finned pike pompano dolphinfish lefteye flounder
          orbicular velvetfish. Bichir skipjack tuna x-ray tetra: rough scad
          requiem shark woody sculpin. Mudskipper, golden dojo. Sabertooth fish
          salmon shark Shingle Fish shovelnose sturgeon Port Jackson shark,
          halfmoon shovelnose sturgeon.
        </p>
      </section>
    </>
  );
}
