import React, { useEffect, useState } from 'react';
import Message from './Message'; // Import your Message component

function MessagesList() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('https://0y81swt2hg.execute-api.eu-north-1.amazonaws.com/api/messages');
                const data = await response.json();

                if (data.success) {
                    setMessages(data.messages);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Failed to fetch messages');
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    if (loading) {
        return <div>Loading messages...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="messages-list">
            {messages.map((message) => (
                <Message
                    key={message.MessageID}
                    createdAt={message.CreatedAt}
                    text={message.Text}
                    userName={message.UserName}
                />
            ))}
        </div>
    );
}

export default MessagesList;
