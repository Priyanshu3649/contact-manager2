import React, { useState } from 'react';

const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('photo', photo);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input type="text" className="w-full p-2 border border-gray-300 rounded" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input type="email" className="w-full p-2 border border-gray-300 rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Phone</label>
        <input type="text" className="w-full p-2 border border-gray-300 rounded" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Photo</label>
        <input type="file" className="w-full p-2 border border-gray-300 rounded" onChange={(e) => setPhoto(e.target.files[0])} />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Contact</button>
    </form>
  );
};

export default ContactForm;
