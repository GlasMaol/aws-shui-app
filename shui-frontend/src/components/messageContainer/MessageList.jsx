import React, { useEffect, useState } from 'react';
import '../../components/messageContainer/message.css';

function MessagesList({ onMessageClick }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('https://0y81swt2hg.execute-api.eu-north-1.amazonaws.com/api/messages');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data.success) {
                    const sortedMessages = data.messages.sort((a, b) => {
                        const dateA = new Date(extractDate(a.CreatedAt));
                        const dateB = new Date(extractDate(b.CreatedAt));
                        return dateB - dateA;
                    });
                    setMessages(sortedMessages);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false); // avslutar try catch.
            }
        };

        fetchMessages();
    }, []);

    const extractDate = (createdAt) => {
        return createdAt.split(' - ')[0];
    };

    if (loading) {
        return <div>Loading Messages...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {messages.map((message) => (
                <div
                    key={message.MessageID}
                    className="message"
                    onClick={() => onMessageClick(message)}
                    style={{ cursor: 'pointer', margin: '10px 0', padding: '10px', border: '1px solid #ccc' }}
                >
                    <div className="timestamp">{message.CreatedAt}</div>
                    <div className="text">{message.Text}</div>
                    <div className="user-name">{message.UserName}</div>
                </div>
            ))}
        </div>
    );
}

export default MessagesList;
