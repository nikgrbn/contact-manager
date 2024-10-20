import React, {useRef} from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
    const inputElement = useRef("");
  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };
  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={deleteContactHandler}
        key={contact.id}
      />
    );
  });
    const getSearchTerm = () => {
        props.searchKeyword(inputElement.current.value);
    };
  return (
    <div className="ui container">
      <div className="header-container">
        <h2>Contact List</h2>
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </div>
      <div className="ui container search-bar">
        <div className="ui icon input">
            <input ref={inputElement} type="text" placeholder="Search Contacts..." className="prompt" value={props.term} onChange={getSearchTerm}/>
            <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">{renderContactList.length > 0 ? renderContactList : "No contacts found"}</div>
    </div>
  );
};

export default ContactList;
