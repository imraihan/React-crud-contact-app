import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Home = () => {
  const [viewId, setViewId] = useState();
  const [viewData, setViewData] = useState([]);
  const [show, setShow] = useState(false);
  const [contacts, setContacts] = useState([]);

  const [search, setSearch] = useState('');
  
  const navigate = useNavigate();
// fetch data from local storage
  useEffect(() => {
    const contacts = localStorage.getItem('contacts')!=null?JSON.parse(localStorage.getItem('contacts')):[];
    setContacts((contacts))
  }, [])

  useEffect(() => {
    const contacts = localStorage.getItem('contacts') && localStorage.getItem('contacts').length > 0 ? JSON.parse(localStorage.getItem('contacts')) : []
    const filterOut = contacts.filter((contact) => contact.contact.id === viewId);
    filterOut.forEach((key)=> {
        setViewData(key.contact);
    });
  }, [viewId])
  
  const handleDelete=(id)=> {
    // console.log(typeof(id));
    const filterOut = contacts.filter((contact) => contact.contact.id !== id);
    localStorage.setItem("contacts", JSON.stringify(filterOut));
    setContacts(filterOut);
  }

  const handleEdit =(id)=> {
    navigate(`edit/${id}`);
  }

  const handleView =(id)=> {
    setViewId(id);
    setShow(true);
  }
  const handleClose = () => setShow(false);

  return (
    <div className='container'>
      <div>
      <form>
        <input type="search" 
        id="form1" 
        className="form-control" 
        placeholder='Serach Contact'
        onChange={(e)=>setSearch(e.target.value)}
      />
      </form>
    </div>

      {contacts && contacts.length > 0 ?
      <table className='table table-striped'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {
              contacts.filter((contact)=>{
                const {name } = contact.contact;
                return (search.toLowerCase() === '') ? contact : 
                name.toLowerCase().includes(search);
                    }
                      ).map((contact)=> {
                const {id,name,phone, company } = contact.contact;
                    return (
                      
                      <tr key={id}>
                        <td>{name}</td>
                        <td>{phone}</td>
                        <td>{company}</td>
                        <td>
                        <button type='button' className='btn btn-primary' onClick={()=>{handleDelete(id)}}>Delete</button>
                        <button type='button' className='btn btn-danger' onClick={()=> {handleEdit(id)}}>Edit</button>
                        <button type='button' className='btn btn-info' onClick={()=> {handleView(id)}}>View</button>
                        </td>
                      </tr>
                    
                    )
                  })
            }
            </tbody>
      </table> 
        :  
        `There is no contact`
      }
    <p>
      {(search.toLowerCase() === '') ? 
      (contacts.length>0 ? `${contacts.length} contact is available` :'')
       : ''
      }
    </p>
    
    {/* Modal for view contact details  */}
    {
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className='table table-striped'>
          <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Company</th>
          <th>Address</th>
          <th>Date & Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{viewData.name}</td>
          <td>{viewData.phone}</td>
          <td>{viewData.company}</td>
          <td>{viewData.address}</td>
          <td>{viewData.createDate}</td>
        </tr>
      </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> 
      }
    </div>
  )
}

export default Home
