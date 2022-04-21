interface IHamburgerProps {
  isOpen: boolean;
}

export function HamburgerDiv(props: IHamburgerProps) {
  return (
    <div className="containerForBurger">
      <div className={`${props.isOpen ? " burger1" : "burger"}`}></div>
      <div className={`${props.isOpen ? " burger2" : "burger"}`}></div>
      <div className={`${props.isOpen ? " burger3" : "burger"}`}></div>
    </div>
  );
}
