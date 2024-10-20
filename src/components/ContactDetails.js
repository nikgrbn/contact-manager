import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import user from '../images/pfp.jpg';

const ContactDetail = (props) => {
    const location = useLocation();
    const { id, name, email } = location.state.contact;

    return (
        <div className='main'>
            <div className='ui card centered'>
                <div className='image'>
                    <img src={user} alt='user'/>
                </div>
                <div className='content'>
                    <div className='header'>{name}</div>
                    <div>{email}</div>
                </div>
            </div>
            <div className='button-container'>
                <Link to="/">
                    <button className='ui button blue'>
                        Back to Contact List
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default ContactDetail;
