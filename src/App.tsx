<<<<<<< Updated upstream
import React from 'react';
import logo from './logo.svg';
import './App.css';
=======
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Layout } from "./components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Contact } from "./components/Contact";
import { Booking } from "./components/Booking";
import { Menu } from "./components/Menu";
import { NotFound } from "./components/NotFound";
>>>>>>> Stashed changes

function App() {
  return (
    <div className="App">
<<<<<<< Updated upstream
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
=======
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Booking" element={<Booking />} />
            <Route path="Menu" element={<Menu />} />
            <Route path="*" element= {<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
>>>>>>> Stashed changes
    </div>
  );
}

export default App;
