import React from "react";
import { Link } from "react-router-dom";
export const CartEmpty = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          Cart is empty <span>😕</span>
        </h2>
        <p>
          Most likely, you haven't ordered pizza yet. <br />
          To order pizza, go to the main page.{" "}
        </p>
        <img src="/img/empty-cart.png" alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Сome back</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
