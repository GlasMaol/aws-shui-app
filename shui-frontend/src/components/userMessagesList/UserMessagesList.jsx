import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import '../userMessagesList/userMessagesList.css';
import { useParams } from 'react-router-dom';

const UserMessagesList = () => {
    const { UserName } = useParams();
    console.log('User name from URL:', UserName);

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Fetching messages for user:', UserName);

        const fetchUserMessages = async () => {
            if (!UserName) {
                console.error('No UserName provided in the URL.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`https://0y81swt2hg.execute-api.eu-north-1.amazonaws.com/api/messages/${UserName}`);
                console.log('API Response:', response.data);

                if (response.data.success) {
                    setMessages(response.data.messages);
                    console.log('Messages fetched successfully:', response.data.messages);
                } else {
                    setError(response.data.message);
                    console.error('Error from API:', response.data.message);
                }
            } catch (error) {
                setError(error.response ? error.response.data.message : error.message);
                console.error('Fetch error:', error.response ? error.response.data.message : error.message);
            } finally {
                setLoading(false);
                console.log('Loading complete');
            }
        };

        fetchUserMessages();
    }, [UserName]);

    const extractDate = (createdAt) => {
        return createdAt.split(' - ')[0];
    };

    if (loading) {
        return <div>Loading messages...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            
                {messages.map((message) => (
                    <div
                        key={message.MessageID}
                        className="userMessages"
                        style={{ margin: '25px 0', padding: '10px', border: '1px solid #ccc' }}>
                        <div className="timestamp">{message.CreatedAt}</div>
                        <div className="text">{message.Text}</div>
                        <div className="user-name">{message.UserName}</div>
                        <div className="triangle"></div>
                    </div>
                ))
            }
        </div>
    )
};

export default UserMessagesList;