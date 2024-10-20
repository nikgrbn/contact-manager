import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import ContactList from './ContactList';
import AddContact from './AddContact';
import ContactDetail from './ContactDetails';
import ConfirmationDialog from './ConfirmationDialog'; // Import the dialog


function App() {
  const LOCAL_STORAGE_KEY = "contacts";

  const [contacts, setContacts] = useState([]);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const addContactHandler = (contact) => {
    setContacts([...contacts, {id: uuidv4(), ...contact}]);
  }

  const removeContactHandler = (id) => {
    setContactToDelete(id);
    setDialogVisible(true); // Show the dialog
  };

  const handleConfirmDelete = () => {
    const newContactList = contacts.filter(contact => contact.id !== contactToDelete);
    setContacts(newContactList);
    setDialogVisible(false);
    setContactToDelete(null); // Reset the state
  };

  const handleCancelDelete = () => {
    setDialogVisible(false);
    setContactToDelete(null); // Reset the state
  };

  useEffect(() => {
    const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retrieveContacts)
      setContacts(retrieveContacts);
  }, []);

  useEffect(() => {
    if (contacts.length > 0)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route path="/add" element={<AddContact addContactHandler={addContactHandler}/>} />
          <Route path="/" element= {<ContactList contacts={contacts} getContactId={removeContactHandler} />} />
          <Route path="/contact/:id" element={<ContactDetail />} />
        </Routes>
      </Router>
      {isDialogVisible && (
        <ConfirmationDialog
          message="Delete contact?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default App;
