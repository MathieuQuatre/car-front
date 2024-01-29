import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function MessagingUI() {
    const initialContacts = [
        { id: 2, name: "Alice" },
        { id: 3, name: "Bob" },
        { id: 4, name: "Charlie" }
    ];

    const currentUserId = 1; // Static ID for the current user, replace this with actual user ID
    const [contacts, setContacts] = useState(initialContacts);
    const [currentContact, setCurrentContact] = useState(initialContacts[0] || null);
    const [messages, setMessages] = useState({});
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const fetchMessages = async (userId, otherUserId) => {
        try {
            const response = await fetch(`http://localhost:4001/api/users/${userId}/${otherUserId}/messages`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const userMessages = await response.json();
            const formattedMessages = userMessages.map(msg => ({
                text: msg.MessageBody,
                sender: msg.SenderID === userId
            }));
            setMessages(prevMessages => ({ ...prevMessages, [otherUserId]: formattedMessages }));
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    useEffect(() => {
        if (currentContact) {
            fetchMessages(currentUserId, currentContact.id);
        }
    }, [currentContact]);

    const selectContact = contact => {
        setCurrentContact(contact);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            const updatedMessages = { ...messages };
            const contactMessages = updatedMessages[currentContact.id] || [];
            updatedMessages[currentContact.id] = [...contactMessages, { text: newMessage, sender: true }];
            setMessages(updatedMessages);
            setNewMessage('');
        }
    };

    return (
        <div className="container py-4">
            <div className="row">
                <div className="col-md-4">
                    <div className="mb-3">
                        <input 
                            type="text" 
                            className="form-control"
                            placeholder="Search contacts..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <ul className="list-group">
                        {filteredContacts.map(contact => (
                            <li 
                                key={contact.id} 
                                className={`list-group-item list-group-item-action ${currentContact && contact.id === currentContact.id ? 'active' : ''}`} 
                                onClick={() => selectContact(contact)}
                            >
                                {contact.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-md-8">
                    <div className="border rounded p-3" style={{ height: '400px', overflowY: 'auto' }}>
                        {currentContact && (messages[currentContact.id] || []).map((message, index) => (
                            <div key={index} className={`p-2 my-2 rounded ${message.sender ? 'bg-primary text-white' : 'bg-light'}`}>
                                {message.text}
                            </div>
                        ))}
                    </div>
                    {currentContact && (

                        <div className="mt-3">
                            <input
                                type="text"
                                className="form-control"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                            />
                            <button className="btn btn-primary mt-2" onClick={handleSendMessage}>Send</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MessagingUI;
