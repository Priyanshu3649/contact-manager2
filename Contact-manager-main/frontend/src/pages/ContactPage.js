import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ContactPage = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    // Fetch contact details from the server
    const fetchContact = async () => {
      const response = await fetch(`/api/contacts/${id}`);
      const data = await response.json();
      setContact(data);
    };

    fetchContact();
  }, [id]);

  if (!contact) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{contact.name}</h2>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
      <img src={contact.photoUrl} alt={contact.name} className="w-32 h-32 object-cover rounded-full mt-4" />
    </div>
  );
};

export default ContactPage;
