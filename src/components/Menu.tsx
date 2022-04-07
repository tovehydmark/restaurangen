export function Menu() {
  //Borde vi göra menyn dynamisk på något vis? (om vi har tid)
  return (
    <section className="menu_container">
      <h2>Meny</h2>
      <article className="menu_list">
        <h3>Förrätter</h3>
        <p>
          Skagenröra toppas med löjrom serveras på smörstekt bröd halv/hel
          165.-/225.-
          <br />
          Löjrom från Bottenviken med klassiska tillbehör 285.-/425.-
          <br />
          Hummersoppa med färska skaldjur 187.-/295.-
          <br />
          Amerikansk hummer med smörstekt bröd och majonnäs 295.-/455.-
          <br />
          300 gram rökta räkor med smörstekt bröd och aioli 135.-
        </p>
      </article>
      <article className="menu_list">
        <h3>Huvudrätter</h3>
        <p>
          The CodFathers räksmörgås 235.-
          <br />
          Stekt strömming med skirat smör, lingon samt potatispuré 185.-
          <br />
          Fish n' chips med remouladsås 195.-
          <br />
          Rimmad lax med dillstuvad potatis 245.-
          <br />
          Fisk -och skaldjursgryta med krutonger och aioli 235.-
          <br />
          Smörstekt marulk med skaldjurssås, räkor samt rostade morötter och
          palsternacka serveras med kokt potatis 335.-
        </p>
      </article>
      <article className="menu_list">
        <h3>Skaldjur</h3>
        <p>
          300gr färska räkor med smörstekt bröd och Rhode Island dagspris
          <br />
          300gr rökta räkor med smörstekt bröd och aioli 135.-
          <br />
          Amerikansk hummer med smörstekt bröd och sås 265/425.-
          <br />
          The Codfathers skaldjursplateu ½ amerikansk hummer En näve rökta räkor
          En näve färska räkor 1 havskräfta Vinkokta blåmusslor 3 franska ostron
          Tillhörande såser och smörstekt bröd 625.-/person
          <br />
        </p>
      </article>
    </section>
  );
}
