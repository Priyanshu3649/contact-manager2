import React from 'react';

function Header() {
    return (
        <header className="header">
            <h1>Smart Contact Manager</h1>
            <nav>
                <p> <a href="/">Home</a></p>
                <a href="/login">Login</a>
                <a href="/signup">Sign Up</a>
            </nav>
        </header>
    );
}

export default Header;
