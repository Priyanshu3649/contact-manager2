import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <Header />
      <main className="p-4">
        <h2 className="text-2xl font-bold">Welcome to Smart Contact Manager</h2>
        <p>Manage your contacts easily and efficiently.</p>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
