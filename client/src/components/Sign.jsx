import React from "react";
import search from "./Search/search.svg";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  fetchRegister,
  fetchLogin,
  selectIsAuth,
} from "../redux/slices/authSlice";
import { useForm } from "react-hook-form";
function Sign() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();
  const isAuth = useSelector(selectIsAuth);
  const [signup, setLogin] = React.useState(false);
  const [response, setResponse] = React.useState("");
  const [errorResponse, setErrorResponse] = React.useState("");
  const dispatch = useDispatch();

  const onSubmit = async (value) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const data = await dispatch(fetchRegister(value));
    reset();
    try {
      if (data.payload.token) {
        window.localStorage.setItem("token", data.payload.token);
        window.localStorage.setItem("id", data.payload._id);
        setResponse(data.payload.message);
      } else if (data.payload.response.status === 400) {
        setErrorResponse(data.payload.response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onSubmit2 = async (value) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const data = await dispatch(fetchLogin(value));
    reset();
    try {
      if (data.payload.token) {
        window.localStorage.setItem("token", data.payload.token);
        window.localStorage.setItem("id", data.payload._id);
        setResponse(data.payload.message);
      } else {
        setErrorResponse(data.payload.response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onClickButton = () => {
    setLogin(!signup);
    setErrorResponse("");
    setResponse("");
  };
  const isAuth2 = localStorage.getItem("token");
  if (isAuth2) {
    return <Navigate to="/user" />;
  }
  return (
    <>
      {signup ? (
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)} className="formSign">
            <h3>Sign</h3>
            <label>Name:</label>
            <img className="searchImg" src={search} />
            <input
              {...register("fullName", {
                required: "Full Name is required",
                minLength: {
                  value: 5,
                  message: "Full Name must be at least 5 characters",
                },
              })}
              type="text"
              placeholder="Full Name"
            />
            <div className="ErrorBlock">
              {" "}
              {errors.fullName && (
                <p style={{ color: "red" }}>{`${errors.fullName.message}`}</p>
              )}
            </div>
            <label>Email:</label>
            <img className="searchImg2" src={search} />
            <input
              {...register("email", {
                required: "Email is required",
              })}
              placeholder="Email"
              type="email"
            />
            <div className="ErrorBlock">
              {" "}
              {errors.email && (
                <p style={{ color: "red" }}>{`${errors.email.message}`}</p>
              )}
            </div>
            <label>Password:</label>
            <img className="searchImg3" src={search} />
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 7,
                  message: "Password must be at least 7 characters",
                },
              })}
              placeholder="Password"
              type="password"
            />
            <div className="ErrorBlock">
              {" "}
              {errors.password && (
                <p style={{ color: "red" }}>{`${errors.password.message}`}</p>
              )}
              <p style={{ color: "red", fontSize: 18 }}>
                {errorResponse}
                {response}{" "}
              </p>
            </div>
            <div className="formSignBottom">
              <button
                type="button"
                onClick={onClickButton}
                className="button button--outline button--add"
              >
                Already have a account
              </button>
              <button
                disabled={isSubmitting}
                className={`button button--outline button--add`}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit2)} className="formSign">
            <h3>Login</h3>
            <label>Email:</label>
            <img className="searchImg" src={search} />
            <input
              {...register("email", {
                required: "Email is required",
              })}
              placeholder="Email"
              type="email"
            />
            <div className="ErrorBlock">
              {" "}
              {errors.email && (
                <p style={{ color: "red" }}>{`${errors.email.message}`}</p>
              )}
            </div>
            <label>Password:</label>
            <img className="searchImg2" src={search} />
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 7,
                  message: "Password must be at least 7 characters",
                },
              })}
              placeholder="Password"
              type="password"
            />
            <div className="ErrorBlock">
              {errors.password && (
                <p style={{ color: "red" }}>{`${errors.password.message}`}</p>
              )}
            </div>
            <div className="Error">
              {" "}
              <p style={{ color: "red", fontSize: 18 }}>
                {errorResponse}
                {response}{" "}
              </p>
            </div>
            <div className="formSignBottom">
              <button
                type="button"
                onClick={onClickButton}
                className="button button--outline button--add"
              >
                Register
              </button>
              <button
                disabled={isSubmitting}
                className={`button button--outline button--add`}
              >
                Login{" "}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Sign;
