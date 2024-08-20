import React from 'react';
import { Link } from 'react-router-dom';

const ContactList = ({ contacts }) => {
  return (
    <div className="p-4">
      {contacts.map(contact => (
        <div key={contact.id} className="p-4 bg-white shadow rounded mb-4">
          <h3 className="text-lg font-bold">{contact.name}</h3>
          <p>{contact.email}</p>
          <Link to={`/contacts/${contact.id}`} className="text-blue-500">View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
