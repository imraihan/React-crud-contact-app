import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Home = () => {
  const [viewId, setViewId] = useState();
  const [viewData, setViewData] = useState([]);
  const [show, setShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [deleteId, setDeleteId] = useState('');

  const [search, setSearch] = useState('');

  let searchCount = 0;
  
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
  
  const handleClickDelete =(id) => {
    setDeleteId(id);
    console.log(id)
    setDeleteShow(true);
  }

  const handleDelete=(id)=> {
    const filterOut = contacts.filter((contact) => contact.contact.id !== deleteId);
    localStorage.setItem("contacts", JSON.stringify(filterOut));
    setContacts(filterOut);
    setDeleteShow(false);
  }

  const handleEdit =(id)=> {
    navigate(`edit/${id}`);
  }

  const handleView =(id)=> {
    setViewId(id);
    setShow(true);
  }
  const handleClose = () => setShow(false);
  const handleCloseDelete = () => setDeleteShow(false);

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

                searchCount = (contacts.filter((contact)=>{
                  const {name } = contact.contact;
                  return name.toLowerCase().includes(search.toLowerCase())}).length);

                return (search.toLowerCase() === '') ? contact : 
                name.toLowerCase().includes(search.toLowerCase());

                    }
                      ).map((contact)=> {
                        const {id,name,phone, company } = contact.contact;
                    return (
                      
                      <tr key={id}>
                        <td>{name}</td>
                        <td>{phone}</td>
                        <td>{company}</td>
                        <td>
                        <button type='button' className='btn btn-primary' onClick={()=>{handleClickDelete(id)}}>Delete</button>
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
        ''
      }
    <p>
      {
      (search.toLowerCase() === '') ? 
      (contacts.length>0 ? `${contacts.length} contact available` :'no contact available')
       :
       (
        searchCount > 0 ? searchCount + ' contact found' : 'no contact found')
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


{/* Modal for delete popup */}
      {<Modal show={deleteShow} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure want to delete this?
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleDelete}>
            Ok
          </Button>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>}

    </div>
  )
}

export default Home
