interface IHamburgerProps {
  isOpen: boolean;
}

//Styling for classes in the hamburger div is in _base.scss file

export function HamburgerDiv(props: IHamburgerProps) {
  return (
    <div className="containerForBurger">
      <div className={`${props.isOpen ? " burger1" : "burger"}`}></div>
      <div className={`${props.isOpen ? " burger2" : "burger"}`}></div>
      <div className={`${props.isOpen ? " burger3" : "burger"}`}></div>
    </div>
  );
}
