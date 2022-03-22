import Cookies from "universal-cookie";

console.log("hola");

export const something = () => {
  const cookie = new Cookies();
  console.log("aquí");
};
