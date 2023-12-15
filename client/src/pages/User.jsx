import React from "react";
import axios from "axios";
import { fetchOrderToUser } from "../redux/slices/orderSlice";
import { useDispatch } from "react-redux";
import logout from "../redux/slices/authSlice";
import { Navigate } from "react-router-dom";
import { URL } from "../App";
const User = () => {
  const dispatch = useDispatch();
  const id = window.localStorage.getItem("id");
  const [userData, setUserData] = React.useState([]);
  const [orderData, setOrderData] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${URL}/user?id=${id}`);
        await setUserData(data);

        const dataOrder = await dispatch(fetchOrderToUser(id));

        await setOrderData(dataOrder.payload);
      } catch (err) {}
    };
    fetchData();
  }, [id]);
  console.log(id);
  if (id === null) {
    return <Navigate to="/sign" />;
  }
  function handleClearLocalStorage() {
    window.localStorage.clear();
    setUserData([]);
  }
  function formatDate(dateString) {
    const date = new Date(dateString);

    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }
  return (
    <div className="container">
      <div className="UserBlock">
        <p className="textUserName"> userName: {userData.fullName}</p>
        {orderData.length !== 0 ? (
          <p className="textOrder">your orders:</p>
        ) : (
          <p className="textOrder"> You dont have orders yet</p>
        )}
        <button
          className="button button--outline button--add"
          onClick={handleClearLocalStorage}
        >
          Log out
        </button>
        <div className="orderDetails">
          {orderData.map((obj, index) => (
            <div key={obj._id}>
              <p className="description">Order {index + 1}:</p>
              <p className="description">
                Pizzas:
                {obj.pizzas.map((pizza, pizzaIndex) => (
                  <div className="orderInside">
                    <img
                      className="pizzaImg"
                      width={100}
                      height={100}
                      src={pizza.imageUrl}
                    />
                    <div className="pizzaTitleTypes" key={pizza._id}>
                      <p>{pizza.title},</p>
                      <p>{pizza.types}</p>
                    </div>
                    <p className="pizzaPrice" key={pizza._id}>
                      {pizza.price}
                    </p>
                    <p className="pizzaQuantity" key={pizza._id}>
                      {pizza.quantity}
                    </p>
                  </div>
                ))}
              </p>
              <p className="totalPrice">Total Price: {obj.totalPrice} $</p>
              <p className="createData">
                Created At: {formatDate(obj.createdAt)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default User;
