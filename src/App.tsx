import React from "react";

import "./App.css";
import { Layout } from "./components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Contact } from "./components/Contact";
import { Booking } from "./components/Booking";
import { Menu } from "./components/Menu";
import { NotFound } from "./components/NotFound";
import { Admin } from "./components/Admin";
import { AdminDetails } from "./components/AdminDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Booking" element={<Booking />} />
            <Route path="/Menu" element={<Menu />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/bookinginfo/:id" element={<AdminDetails />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
