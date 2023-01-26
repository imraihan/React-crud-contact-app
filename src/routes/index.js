import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddContact from "../components/AddContact";
import ContactModal from '../components/ContactModal';
import EditContact from "../components/EditContact";
import Error from "../components/Error";
import Home from "../components/Home";
import Navbar from '../layouts/Navbar';
const Index = () => {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/add" element={<AddContact />}/>
        <Route path="/edit/:id" element={<EditContact />}/>
        <Route path="/view/:id" element={<ContactModal />}/>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Index