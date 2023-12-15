import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import { Routes, Route } from "react-router-dom";
import FullPizza from "./pages/FullPizza";
import Sign from "./components/Sign";
import User from "./pages/User";
export const URL = "https://mern-pizza-app-api.onrender.com";
function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/pizza/:id" element={<FullPizza />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
