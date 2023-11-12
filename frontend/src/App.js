import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
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