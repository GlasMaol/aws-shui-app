import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../components/messageContainer/message.css';

function MessagesList({ onMessageClick }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('https://0y81swt2hg.execute-api.eu-north-1.amazonaws.com/api/messages');
                const data = response.data;

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
                setError(error.response ? error.response.data.message : error.message);
            } finally {
                setLoading(false);
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
                    onClick={() => onMessageClick({ MessageID: message.MessageID, UserName: message.UserName })}
                    style={{ cursor: 'pointer', margin: '25px 0', padding: '10px', border: '1px solid #ccc' }}>
                    <div className="timestamp">{message.CreatedAt}</div>
                    <div className="text">{message.Text}</div>
                    <div className="user-name">{message.UserName}</div>
                    <div className="triangle"></div>
                </div>
            ))}
        </div>
    );
}

export default MessagesList;
