import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        axios.get('/api/contacts')
            .then(response => setContacts(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Contacts</h1>
            <ul>
                {contacts.map(contact => (
                    <li key={contact.id} className="mb-2">
                        <a href={`/contacts/${contact.id}`} className="text-blue-500">{contact.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContactList;
