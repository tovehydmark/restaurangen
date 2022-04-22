import "../style/style.scss";

interface IHamburgerProps {
  isOpen: boolean;
}

//Bars in the hamburger, different classNames to enable animation

export function Hamburger(props: IHamburgerProps) {
  return (
    <div>
      <div className={`${props.isOpen ? " burger1" : "burger"}`}></div>
      <div className={`${props.isOpen ? " burger2" : "burger"}`}></div>
      <div className={`${props.isOpen ? " burger3" : "burger"}`}></div>
    </div>
  );
}
