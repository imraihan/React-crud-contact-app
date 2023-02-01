import React from 'react'
import { useState, useEffect } from 'react';
import { dateFormat } from '../helper/helper';
import { useNavigate, useParams } from 'react-router-dom';

const EditContact = () => {
const { id } = useParams();
// console.log(id);
  const [editData, setEditData] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const contacts = localStorage.getItem('contacts') && localStorage.getItem('contacts').length > 0 ? JSON.parse(localStorage.getItem('contacts')) : []
    const filterOut = contacts.filter((contact) => contact.contact.id === id);
    setEditData(filterOut[0].contact);
    setName(filterOut[0].contact.name);
    setPhone(filterOut[0].contact.phone);
    setCompany(filterOut[0].contact.company);
    setAddress(filterOut[0].contact.address);
  }, [])

    const handleContactEdit =(e)=> {
      const editDate = dateFormat();
      let contact = {id : id,name,phone,company,address,createDate: editData.createDate,editDate}
      const prevData = localStorage.getItem('contacts') && localStorage.getItem('contacts').length > 0 ? JSON.parse(localStorage.getItem('contacts')) : []
      prevData.filter((contact) => contact.contact.id === id)[0].contact = contact;
      localStorage.setItem('contacts', JSON.stringify(prevData))
      navigate('/');
    }
    const handleChange = (e) => {
      if(e.target.id === 'name') {
        setName(e.target.value);
      } else if(e.target.id === 'phone') {
        setPhone(e.target.value);
      } else if(e.target.id === 'company') {
        setCompany(e.target.value);
      } else if(e.target.id === 'address') {
        setAddress(e.target.value);
      }     
    }

  return (
    <div className='container'>
        <form onSubmit={handleContactEdit}>
        <div className='form-group'>
        <label>Name</label>
          <input id="name" type="text" required className='form-control' name="name" value={name} onChange={handleChange}></input>
        </div>
        <div className='form-group'>
        <label>Phone</label>
          <input id="phone" type="phone" required className='form-control' name="phone" value={phone} onChange={handleChange}></input>
        </div>
        <div className='form-group'>
        <label>Company</label>
        <input id="company" type="text" required className='form-control' name="company" value={company} onChange={handleChange}></input>
        </div>
        <div className='form-group'>
        <label>Address</label>
        <input id="address" type="text" required className='form-control' name="address" value={address} onChange={handleChange}></input>
        </div> <br></br>
        <button type='submit' className='btn btn-success btn-md'>Update Contact</button>
        <button className='btn' onClick={() => navigate(-1)}>Back</button>
        </form>
    </div>
  )
}

export default EditContact
