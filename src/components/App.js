import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import ContactDetail from "./ContactDetails";
import ConfirmationDialog from "./ConfirmationDialog"; // Import the dialog
import api from "../api/contacts";
import EditContact from "./EditContact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";

  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(),
      ...contact,
    };

    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const removeContactHandler = (id) => {
    setContactToDelete(id);
    setDialogVisible(true); // Show the dialog
  };

  const handleConfirmDelete = async () => {
    await api.delete(`/contacts/${contactToDelete}`);
    
    // Remove the contact from the contacts list
    const newContactList = contacts.filter(
      (contact) => contact.id !== contactToDelete
    );
    setContacts(newContactList);
  
    // Update the search results if a search is active
    if (searchTerm !== "") {
      const newSearchResults = newContactList.filter((contact) => {
        // Create a new object excluding the 'id' field
        const { id, ...contactWithoutId } = contact;
  
        // Join the remaining values and check for the search term
        return Object.values(contactWithoutId)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newSearchResults);
    } else {
      // If no search is active, reset search results to the new contacts list
      setSearchResults(newContactList);
    }
  
    setDialogVisible(false);
    setContactToDelete(null); // Reset the state
  };

  const handleCancelDelete = () => {
    setDialogVisible(false);
    setContactToDelete(null); // Reset the state
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        // Create a new object excluding the 'id' field
        const { id, ...contactWithoutId } = contact;
  
        // Join the remaining values and check for the search term
        return Object.values(contactWithoutId)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  }

  useEffect(() => {
    // const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retrieveContacts)
    //   setContacts(retrieveContacts);
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllContacts();
  }, []);

  // useEffect(() => {
  //   if (contacts.length > 0)
  //     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  // }, [contacts]);

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route
            path="/"
            element={
              <ContactList
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            }
          />
          <Route path="/contact/:id" element={<ContactDetail />} />
          <Route
            path="/edit"
            element={
              <EditContact updateContactHandler={updateContactHandler} />
            }
          />
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
