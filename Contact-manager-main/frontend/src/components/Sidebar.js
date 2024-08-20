import React from 'react';

function Sidebar() {
    return (
        <aside className="sidebar">
            <ul>
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/contacts">Contacts</a></li>
                <li><a href="/favorites">Favorites</a></li>
                <li><a href="/settings">Settings</a></li>
            </ul>
        </aside>
    );
}

export default Sidebar;
