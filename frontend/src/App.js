import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Signup from "./components/users/Signup";
import Login from "./components/users/Login";
import Users from "./components/users/Users";
import UserView from "./components/users/UserView";
import UserEdit from "./components/users/UserEdit";
import Hotels from "./components/hotels/Hotels";
import AddHotel from "./components/hotels/AddHotel";
import Room from "./components/Room";
// import Page404 from "./components/Page404";
// import About from "./components/About";
// import Contacts from "./components/Contacts";
// import Catalog from "./components/Catalog";
// import Product from "./components/Product";
// import Cart from './components/Cart';
// "bootstrap": "^5.2.3",

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/room" element={<Room />} />
          <Route path="/addhotel" element={<AddHotel />} />
          <Route path="/userview/:id" element={<UserView />} />
          <Route path="/useredit/:id" element={<UserEdit />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Page404 />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;