export const fetchContacts = async () => {
    const response = await fetch('/api/contacts');
    return response.json();
};

export const addContact = async (contact) => {
    const response = await fetch('/api/contacts', {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};
