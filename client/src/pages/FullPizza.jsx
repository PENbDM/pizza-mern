import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { URL } from "../App";
export const FullPizza = () => {
  const [pizza, setPizza] = React.useState({
    imageUrl: "",
    title: "",
    price: 0,
  });
  const _id = useSelector((state) => state.pizza._id);

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`${URL}/getpizza/${_id}`);
        setPizza(data);
      } catch (error) {
        alert("Error");
      }
    }
    fetchPizza();
  }, [_id]);

  if (!pizza) {
    return (
      <div className="container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="containerOnePizza">
      <img width={300} height={300} src={pizza.imageUrl} alt={pizza.title} />
      <h2>{pizza.title}</h2>
      <h4>Price: {pizza.price} $</h4>
    </div>
  );
};

export default FullPizza;
