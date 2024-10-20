import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

const EditContact = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    // Check if location.state or location.state.contact is undefined
    const contact = location.state?.contact || { name: "", email: "" };
    
    const [name, setName] = useState(contact.name);
    const [email, setEmail] = useState(contact.email);

    const update = (e) => {
        e.preventDefault();
        if (name === "" || email === "") {
            alert("All the fields are mandatory!");
            return;
        }
        props.updateContactHandler({ id: contact.id, name: name, email: email });
        setName("");
        setEmail("");

        // Programmatically navigate to the home page after adding contact
        navigate("/");
    };

    return (
        <div className="ui container">
            <h2>Edit Contact</h2>
            <form className="ui form" onSubmit={update}>
                <div className="field">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button className="ui button blue">Save</button>
            </form>
        </div>
    );
};

export default EditContact;
