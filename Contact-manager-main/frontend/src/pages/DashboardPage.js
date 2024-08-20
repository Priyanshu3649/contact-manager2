import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ContactList from '../components/ContactList';

const DashboardPage = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Fetch contacts from the server
    const fetchContacts = async () => {
      const response = await fetch('/api/contacts');
      const data = await response.json();
      setContacts(data);
    };

    fetchContacts();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <ContactList contacts={contacts} />
      </main>
    </div>
  );
};

export default DashboardPage;
