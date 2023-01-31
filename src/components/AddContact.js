import React from 'react'
import { useState } from 'react';
import {v4 as uuidv4 } from "uuid";
import { dateFormat } from '../helper/helper';
import { useNavigate } from 'react-router-dom';

const AddContact = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [address, setAddress] = useState('');

    const navigate = useNavigate();

    const handleContactSubmit = (e) => {
        e.preventDefault();
        const createDate = dateFormat();
        let contact = {id : uuidv4(),name,phone,company,address,createDate}
        const contacts = localStorage.getItem('contacts') && localStorage.getItem('contacts').length > 0 ? JSON.parse(localStorage.getItem('contacts')) : []
        localStorage.setItem('contacts', JSON.stringify([...contacts, {contact}]))
        navigate('/');
      }
  
  return (
    <div className='container'>
      <form onSubmit={handleContactSubmit}>
        <div className='form-group'>
        <label>Name</label>
          <input type="text" className='form-control' required
          onChange={(e)=>setName(e.target.value)} value={name}></input>
        </div>
        <div className='form-group'>
        <label>Phone</label>
          <input type="phone" className='form-control' required
          onChange={(e)=>setPhone(e.target.value)} value={phone}></input>
        </div>
        <div className='form-group'>
        <label>Company</label>
          <input type="text" className='form-control' required
          onChange={(e)=>setCompany(e.target.value)} value={company}></input>
        </div>
        <div className='form-group'>
        <label>Address</label>
          <input type="text" className='form-control' required
          onChange={(e)=>setAddress(e.target.value)} value={address}></input>
        </div>  <br></br>     
        <button type='submit' className='btn btn-success btn-md'>Add Contact</button>
        </form>
    </div>
  )
}

export default AddContact
